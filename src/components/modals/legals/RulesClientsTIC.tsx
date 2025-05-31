import React from "react";
import PrimaryButton from "../../buttons/PrimaryButton";
import Link from "next/link";

const RulesClientsTIC = () => {
  return (
    <PrimaryButton
      size="sm"
      as={Link}
      target="_blank"
      href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/305000-309999/305484/norma.htm"
      className="bg-black p-0 font-normal text-white max-md:text-xs"
    >
      Reglamento de Clientes de Servicios TIC
    </PrimaryButton>
  );
};

export default RulesClientsTIC;
