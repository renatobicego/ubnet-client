"use client";
import { useMap } from "@vis.gl/react-google-maps";
import DirectionSelect from "./DirectionSelect";
import PlanTypeMapReference from "./PlanTypeMapReference";
import DrawingMap from "./ZonesMap";
import { Suspense, useState } from "react";
import { Skeleton } from "@heroui/react";

const ZonesMapWrapper = () => {
  const map = useMap();
  const [latLng, setLatLng] = useState({ lat: -45.8569848, lng: -67.5136643 });
  return (
    <>
      <DirectionSelect
        handleChangeLocation={(lat, lng) => setLatLng({ lat, lng })}
        map={map}
      />
      <article className="relative w-full">
        <PlanTypeMapReference />
        <Suspense fallback={<Skeleton className="h-[60vh] w-full" />}>
          <DrawingMap map={map} latLng={latLng} />
        </Suspense>
      </article>
    </>
  );
};

export default ZonesMapWrapper;
