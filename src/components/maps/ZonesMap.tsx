"use client";
import { Map, APIProvider } from "@vis.gl/react-google-maps";

import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useReducer, useRef } from "react";
import { useLoadShapes } from "@/utils/hooks/useLoadShapes";
import reducer from "@/store/mapsReducer";
import { Spinner } from "@heroui/react";

// Replace with your actual API key

export const MapSetup = ({ children }: { children: React.ReactNode }) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string}>
      {children}
    </APIProvider>
  );
};

const DrawingMap = ({
  map,
  latLng,
}: {
  map: google.maps.Map | null;
  latLng: {
    lat: number;
    lng: number;
  };
}) => {
  const drawing = useMapsLibrary("drawing");
  const mapRef = useRef<google.maps.Map | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useReducer(reducer, {
    now: [],
    past: [],
    future: [],
    shapesToDelete: [],
  });

  // Set up event listeners and load shapes
  const { isLoading } = useLoadShapes(map, drawing, dispatch);

  // Only update the center when latLng changes
  useEffect(() => {
    if (mapRef.current && latLng) {
      mapRef.current.panTo(latLng);
    }
  }, [latLng]);

  const isReady = !!drawing && !isLoading;

  return (
    <div className="relative h-[60vh] w-full">
      {!isReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <Spinner size="lg" />
        </div>
      )}
      <Map
        defaultZoom={12}
        defaultCenter={{ lat: latLng.lat, lng: latLng.lng }}
        gestureHandling={"greedy"}
        fullscreenControl
        disableDefaultUI
        onTilesLoaded={(e) => {
          mapRef.current = e.map;
        }}
      />
    </div>
  );
};

export default DrawingMap;
