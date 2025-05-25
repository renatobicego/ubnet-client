import { State } from "@/types/maps-types";
import { RefObject, useEffect } from "react";
import { isCircle, isPolygon } from "../mapsUtils";

// Update overlays with the current "snapshot" when the "now" state changes
export function useOverlaySnapshots(
  map: google.maps.Map | null,
  state: State,
  overlaysShouldUpdateRef: RefObject<boolean>,
) {
  useEffect(() => {
    if (!map || !state.now) return;

    for (const overlay of state.now) {
      overlaysShouldUpdateRef.current = false;

      overlay.geometry.setMap(map);

      const { radius, center, path } = overlay.snapshot;

      if (isCircle(overlay.geometry)) {
        overlay.geometry.setRadius(radius ?? 0);
        overlay.geometry.setCenter(center ?? null);
      } else if (isPolygon(overlay.geometry)) {
        overlay.geometry.setPath(path ?? []);
      }

      overlaysShouldUpdateRef.current = true;
    }

    return () => {
      for (const overlay of state.now) {
        overlay.geometry.setMap(null);
      }
    };
  }, [map, overlaysShouldUpdateRef, state.now]);
}
