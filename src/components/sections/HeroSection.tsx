import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      data-observe={true}
      className="flex min-h-[300px] w-full flex-col items-start gap-4 py-10 text-white"
    >
      <h1 className="!font-eurostile">Creando Conexiones</h1>
      <h2 className="title-3">
        La internet más rápida de la región patagónica
      </h2>
      <PrimaryButton
        as={Link}
        data-observe={true}
        href="/planes"
        color="secondary"
        className="text-primary"
        size="lg"
      >
        Conocé nuestros planes
      </PrimaryButton>
    </section>
  );
};

export default HeroSection;
