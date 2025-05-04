import { IconType } from "react-icons";
import { FaCheckCircle, FaHandshake } from "react-icons/fa";
import { LuRadioTower } from "react-icons/lu";

// Define the feature type
type Feature = {
  icon: IconType;
  title: string;
  description: string;
};

// Create an array of features
const features: Feature[] = [
  {
    icon: FaCheckCircle,
    title: "100% estable",
    description:
      "Excelente estabilidad en el servicio, gracias a la red propia interprovincial de alta velocidad.",
  },
  {
    icon: FaHandshake,
    title: "Excelente postventa",
    description:
      "Cada ciudad tiene su oficina de atención al público propia, cuadrillas y vehículos propios, dando una inmediata atención a cada requerimiento.",
  },
  {
    icon: LuRadioTower,
    title: "5G y Fibra hogar",
    description:
      "Único proveedor con tecnología híbrida entre fibra al hogar y cobertura por microondas 5G.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative z-10 w-full">
      <article className="mx-auto space-y-8 rounded-2xl bg-white p-6 shadow-lg md:rounded-4xl md:p-10 xl:px-16 2xl:px-20">
        <header>
          <h2 className="title-3 font-medium">¿Por qué elegirnos?</h2>
          <p className="mt-2">
            Descubre las claves que nos hacen diferentes a la competencia.
          </p>
        </header>

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3 lg:gap-6 xl:gap-8">
          {features.map((feature, index) => (
            <li key={index} className="space-y-2 md:space-y-4">
              <span className="flex justify-start">
                <feature.icon className="size-10 text-blue-800 md:size-12 xl:size-14" />
              </span>
              <h3 className="title-3 font-medium">{feature.title}</h3>
              <p className="text-left text-black/60">{feature.description}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
