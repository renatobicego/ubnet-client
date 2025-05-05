import { MapSetup } from "@/components/maps/ZonesMap";
import ZonesMapWrapper from "@/components/maps/ZonesMapWrapper";

export default function MapZones() {
  return (
    <main
      data-observe={true}
      className="bg-primary_bg relative bg-contain text-white"
    >
      <section
        data-observe={true}
        className="light-section mx-auto flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-white py-6 max-md:px-4 md:rounded-4xl md:p-10 xl:px-16 2xl:px-20"
      >
        <h1 className="title-3 font-helvetica font-medium text-black">
          Consultá nuestra cobertura
        </h1>
        <MapSetup>
          <ZonesMapWrapper />
        </MapSetup>
      </section>
    </main>
  );
}
