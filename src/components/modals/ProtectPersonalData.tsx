import PrimaryButton from "../buttons/PrimaryButton";
import CustomModal from "./CustomModal";

const ProtectPersonalData = () => {
  return (
    <CustomModal
      title="Protección de datos personales"
      button={
        <PrimaryButton
          size="sm"
          className="bg-black p-0 font-normal text-white max-md:text-xs"
        >
          Protección de datos personales
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

export default ProtectPersonalData;
