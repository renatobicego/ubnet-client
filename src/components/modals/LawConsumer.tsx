import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import CustomModal from "./CustomModal";

const LawConsumer = () => {
  return (
    <CustomModal
      title="Ley de Defensa al Consumidor"
      button={
        <PrimaryButton
          size="sm"
          className="bg-black p-0 font-normal text-white max-md:text-xs"
        >
          Ley de Defensa al Consumidor
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

export default LawConsumer;
