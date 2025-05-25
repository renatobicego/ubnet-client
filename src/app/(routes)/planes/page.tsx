import PlanesGrid from "@/components/sections/PlanesGrid";
import { PlanType } from "@/types/subscription-plans";
import Image from "next/image";

export default function SubscriptionPlansPage() {
  const filters: { id: PlanType; label: string }[] = [
    { id: "fiber", label: "Ubnet Fiber" },
    { id: "5g", label: "Microondas 5G" },
    { id: "security", label: "Cámaras de Seguridad" },
  ];

  return (
    <main className="bg-primary_bg relative bg-contain text-white">
      <Image
        src="/wifi-big.png"
        alt="iconos de wifi"
        width={1736}
        priority
        height={1581}
        className="absolute top-0 z-0 w-screen object-cover max-md:hidden md:h-full"
      />
      <Image
        src="/wifi-grid-mobile.png"
        alt="iconos de wifi en celular"
        width={979}
        priority
        height={816}
        className="absolute top-0 z-0 h-screen w-screen object-cover md:hidden"
      />
      <section className="relative z-10 flex w-full flex-col items-center justify-center gap-4">
        <h1
          data-observe={true}
          className="font-helvetica title-2 text-center font-medium"
        >
          Nuestros planes
        </h1>
        <p
          data-observe={true}
          className="text-center md:max-w-[80%] lg:max-w-[40%] 2xl:max-w-[30%]"
        >
          ¿Buscás un plan que se ajuste a tus necesidades? ¡Checkeá las
          características de cada uno y contratalo ahora!
        </p>
        <PlanesGrid filters={filters} />
      </section>
    </main>
  );
}
