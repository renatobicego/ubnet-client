import React from "react";
import PrimaryButton from "../../buttons/PrimaryButton";
import CustomModal from "./CustomModal";

const TermsConditions = () => {
  return (
    <CustomModal
      title="Términos y condiciones"
      button={
        <PrimaryButton
          size="sm"
          className="bg-black p-0 font-normal text-white max-md:text-xs"
        >
          Términos y condiciones
        </PrimaryButton>
      }
    >
      Equipamiento otorgado en comodato. Instalación gratuita mediante
      suscripción por débito automático tarjeta de crédito.
    </CustomModal>
  );
};

export default TermsConditions;
