import { getShapes } from "@/services/mapsZonesServices";
import { Action, DrawingActionKind } from "@/types/maps-types";
import { Dispatch, useEffect } from "react";

// Load shapes from the database
export function useLoadShapes(
  map: google.maps.Map | null,
  drawing: google.maps.DrawingLibrary | null,
  dispatch: Dispatch<Action>,
) {
  useEffect(() => {
    if (!map || !drawing) return;

    const loadShapes = async () => {
      try {
        const shapes = await getShapes();
        shapes.forEach((shape) => {
          let overlay: google.maps.Circle | google.maps.Polygon | null = null;

          if (shape.type === "CIRCLE" && shape.circle) {
            overlay = new google.maps.Circle({
              map,
              center: shape.circle.center,
              radius: shape.circle.radius,
              strokeColor: "#0D4DA1",
              fillColor: "#0D4DA1",
              fillOpacity: 0.4,
            });

            dispatch({
              type: DrawingActionKind.SET_OVERLAY,
              payload: {
                type: google.maps.drawing.OverlayType.CIRCLE,
                overlay,
                _id: shape._id,
              },
            });
          } else if (shape.type === "POLYGON" && shape.polygon) {
            overlay = new google.maps.Polygon({
              map,
              paths: shape.polygon.path,
              strokeColor: "#DE5753",
              fillColor: "#DE5753",
              fillOpacity: 0.4,
            });

            dispatch({
              type: DrawingActionKind.SET_OVERLAY,
              payload: {
                type: google.maps.drawing.OverlayType.POLYGON,
                overlay,
                _id: shape._id,
              },
            });
          }
        });
      } catch (error) {
        console.error("Error loading shapes:", error);
      }
    };

    loadShapes();
  }, [drawing, dispatch, map]);
}
