import { Overlay, Action, DrawingActionKind } from "@/types/maps-types";
import { Dispatch, useEffect } from "react";

// Handle click events on the map to delete shapes in delete mode
export function useDeleteClickHandler(
  map: google.maps.Map | null,
  overlays: Overlay[],
  dispatch: Dispatch<Action>,
  isDeleteMode: boolean,
) {
  useEffect(() => {
    if (!map || !isDeleteMode) return;

    // Set cursor to indicate delete mode
    map.setOptions({ draggableCursor: "pointer" });

    // Add click listeners to each overlay
    const clickListeners = overlays.map((overlay) => {
      return google.maps.event.addListener(overlay.geometry, "click", () => {
        if (isDeleteMode && overlay.id) {
          const confirmDelete = confirm(
            "¿Estás seguro que quieres borrar esta zona?",
          );
          if (confirmDelete) {
            dispatch({
              type: DrawingActionKind.DELETE_OVERLAY,
              payload: { id: overlay.id },
            });
          }
        }
      });
    });

    return () => {
      // Reset cursor when exiting delete mode
      map.setOptions({ draggableCursor: null });

      // Remove all click listeners
      clickListeners.forEach((listener) =>
        google.maps.event.removeListener(listener),
      );
    };
  }, [map, overlays, dispatch, isDeleteMode]);
}
