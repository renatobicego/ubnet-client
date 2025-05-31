import React from "react";
import PrimaryButton from "../../buttons/PrimaryButton";
import Link from "next/link";

const LawConsumer = () => {
  return (
    <PrimaryButton
      size="sm"
      as={Link}
      target="_blank"
      href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/638/texact.htm"
      className="bg-black p-0 font-normal text-white max-md:text-xs"
    >
      Ley de Defensa al Consumidor
    </PrimaryButton>
  );
};

export default LawConsumer;
