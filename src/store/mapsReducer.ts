import {
  type State,
  type Action,
  DrawingActionKind,
  type Overlay,
  type Snapshot,
  type ShapeData,
} from "@/types/maps-types";
import { isCircle, isPolygon } from "@/utils/mapsUtils";
import { v4 as uuidv4 } from "uuid";

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    // This action is called whenever anything changes on any overlay.
    case DrawingActionKind.UPDATE_OVERLAYS: {
      const overlays = state.now.map((overlay: Overlay) => {
        const snapshot: Snapshot = {};
        const { geometry } = overlay;

        if (isCircle(geometry)) {
          snapshot.center = geometry.getCenter()?.toJSON();
          snapshot.radius = geometry.getRadius();
        } else if (isPolygon(geometry)) {
          snapshot.path = geometry.getPath()?.getArray();
        }

        // Update the shape in the database
        if (overlay.dbId && snapshot) {
          const shapeData: Partial<ShapeData> = {
            type:
              overlay.type === google.maps.drawing.OverlayType.CIRCLE
                ? "CIRCLE"
                : "POLYGON",
          };

          if (isCircle(geometry) && snapshot.center && snapshot.radius) {
            shapeData.circle = {
              center: snapshot.center,
              radius: snapshot.radius,
            };
          } else if (isPolygon(geometry) && snapshot.path) {
            shapeData.polygon = {
              path: snapshot.path.map((latLng) => ({
                lat: latLng.lat(),
                lng: latLng.lng(),
              })),
            };
          }

          // api.updateShape(overlay.dbId, shapeData).catch(console.error);
        }

        return {
          ...overlay,
          snapshot,
        };
      });

      return {
        past: [...state.past, state.now],
        now: [...overlays],
        future: [], // Clear future when a new action is performed
        shapesToDelete: state.shapesToDelete,
      };
    }

    // This action is called when a new overlay is added to the map.
    case DrawingActionKind.SET_OVERLAY: {
      const { overlay, _id } = action.payload;
      const clientId = uuidv4().substring(0, 8); // Generate a unique ID for the new overlay
      const snapshot: Snapshot = {};

      if (isCircle(overlay)) {
        snapshot.center = overlay.getCenter()?.toJSON();
        snapshot.radius = overlay.getRadius();
      } else if (isPolygon(overlay)) {
        snapshot.path = overlay.getPath()?.getArray();
      }

      // Save the new shape to the database
      const shapeData: ShapeData = {
        type:
          action.payload.type === google.maps.drawing.OverlayType.CIRCLE
            ? "CIRCLE"
            : "POLYGON",
        clientId,
      };

      if (isCircle(overlay) && snapshot.center && snapshot.radius) {
        shapeData.circle = {
          center: snapshot.center,
          radius: snapshot.radius,
        };
      } else if (isPolygon(overlay) && snapshot.path) {
        shapeData.polygon = {
          path: snapshot.path.map((latLng) => ({
            lat: latLng.lat(),
            lng: latLng.lng(),
          })),
        };
      }

      // Create a new overlay object with a temporary ID
      const newOverlay: Overlay = {
        type: action.payload.type,
        geometry: action.payload.overlay,
        snapshot,
        id: clientId,
        dbId: _id,
      };

      return {
        past: [...state.past, state.now],
        now: [...state.now, newOverlay],
        future: [], // Clear future when a new action is performed
        shapesToDelete: state.shapesToDelete,
      };
    }

    // This action is called when the delete button is clicked for a specific overlay.
    case DrawingActionKind.DELETE_OVERLAY: {
      const { id } = action.payload;

      // Find the overlay to delete
      const overlayToDelete = state.now.find((overlay) => overlay.id === id);

      if (!overlayToDelete) return state;

      // Remove the overlay from the map
      overlayToDelete.geometry.setMap(null);

      return {
        past: [...state.past, state.now],
        now: state.now.filter((overlay) => overlay.id !== id),
        future: [], // Clear future when a new action is performed
        shapesToDelete: overlayToDelete.dbId
          ? [...state.shapesToDelete, overlayToDelete.dbId]
          : state.shapesToDelete, // Add the ID to the shapes to delete
      };
    }

    // Load shapes from the database
    case DrawingActionKind.LOAD_SHAPES: {
      return {
        past: [], // Reset past when loading new shapes
        now: [...(action.payload.shapes || [])],
        future: [], // Reset future when loading new shapes
        shapesToDelete: state.shapesToDelete,
      };
    }

    // Undo action - move the current state to the future and go back to the previous state
    case DrawingActionKind.UNDO: {
      if (state.past.length === 0) return state; // Nothing to undo

      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);

      // Remove current overlays from the map
      state.now.forEach((overlay) => {
        overlay.geometry.setMap(null);
      });

      // Add previous overlays back to the map if a map is provided
      if (action.payload?.map) {
        previous.forEach((overlay) => {
          overlay.geometry.setMap(action.payload.map);
        });
      }

      return {
        past: newPast,
        now: previous,
        future: [state.now, ...state.future],
        shapesToDelete: state.shapesToDelete,
      };
    }

    // Redo action - move the current state to the past and restore the next state from the future
    case DrawingActionKind.REDO: {
      if (state.future.length === 0) return state; // Nothing to redo

      const next = state.future[0];
      const newFuture = state.future.slice(1);

      // Remove current overlays from the map
      state.now.forEach((overlay) => {
        overlay.geometry.setMap(null);
      });

      // Add next overlays back to the map if a map is provided
      if (action.payload?.map) {
        next.forEach((overlay) => {
          overlay.geometry.setMap(action.payload.map);
        });
      }

      return {
        past: [...state.past, state.now],
        now: next,
        future: newFuture,
        shapesToDelete: state.shapesToDelete,
      };
    }

    default:
      return state;
  }
}
