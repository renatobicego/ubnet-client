import {
  State,
  Action,
  DrawingActionKind,
  Overlay,
  Snapshot,
  ShapeData,
} from "@/types/maps-types";
import { isCircle, isPolygon } from "@/utils/mapsUtils";
import { v4 as uuidv4 } from "uuid";

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    // This action is called whenever anything changes on any overlay.
    // We then take a snapshot of the relevant values of each overlay and
    // save them as the new "now". The old "now" is added to the "past" stack
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
        now: [...overlays],
      };
    }

    // This action is called when a new overlay is added to the map.
    // We then take a snapshot of the relevant values of the new overlay and
    // add it to the "now" state. The old "now" is added to the "past" stack
    case DrawingActionKind.SET_OVERLAY: {
      const { overlay } = action.payload;
      const clientId = uuidv4();
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
      };

      return {
        now: [...state.now, newOverlay],
      };
    }

    // This action is called when the delete button is clicked for a specific overlay.
    // Remove the overlay with the matching ID from the "now" state.
    // Add the old "now" to the "past" stack to enable undo functionality
    case DrawingActionKind.DELETE_OVERLAY: {
      const { id } = action.payload;

      // Find the overlay to delete
      const overlayToDelete = state.now.find((overlay) => overlay.id === id);

      if (!overlayToDelete) return state;

      // Remove the overlay from the map
      overlayToDelete.geometry.setMap(null);

      return {
        now: state.now.filter((overlay) => overlay.id !== id),
      };
    }

    // Load shapes from the database
    case DrawingActionKind.LOAD_SHAPES: {
      return {
        ...state,
        now: [...state.now],
      };
    }

    default:
      return state;
  }
}
