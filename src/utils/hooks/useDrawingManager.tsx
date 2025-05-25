import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

export function useDrawingManager(
  isDeleteMode: boolean = false,
  initialValue: google.maps.drawing.DrawingManager | null = null,
) {
  const map = useMap();
  const drawing = useMapsLibrary("drawing");

  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager | null>(initialValue);

  useEffect(() => {
    if (!map || !drawing) return;

    // https://developers.google.com/maps/documentation/javascript/reference/drawing
    const newDrawingManager = new drawing.DrawingManager({
      map,
      drawingMode: null,
      drawingControl: !isDeleteMode,
      drawingControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
        ],
      },
      circleOptions: {
        editable: true,
        draggable: true,
        strokeColor: "#0D4DA1",
        fillColor: "#0D4DA1",
        fillOpacity: 0.4,
      },
      polygonOptions: {
        strokeColor: "#DE5753",
        fillColor: "#DE5753",
        fillOpacity: 0.4,
        editable: true,
        draggable: true,
      },
    });

    setDrawingManager(newDrawingManager);

    return () => {
      newDrawingManager.setMap(null);
    };
  }, [drawing, map, isDeleteMode]);

  return drawingManager;
}
