import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import CustomModal from "./CustomModal";

const RulesClientsTIC = () => {
  return (
    <CustomModal
      title="Reglamento de Clientes de Servicios TIC"
      button={
        <PrimaryButton
          size="sm"
          className="bg-black p-0 font-normal text-white max-md:text-xs"
        >
          Reglamento de Clientes de Servicios TIC
        </PrimaryButton>
      }
    >
      <p className="text-center">
        Data
        <br />
      </p>
    </CustomModal>
  );
};

export default RulesClientsTIC;
