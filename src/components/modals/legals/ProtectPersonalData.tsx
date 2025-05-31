import PrimaryButton from "../../buttons/PrimaryButton";
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
      Nos adecuamos a la ley 25.326, protegiendo integralmente los datos
      personales asentados en archivos y registros, para garantizar el derecho
      al honor y a la intimidad de las personas, así como también el acceso a la
      información que sobre las mismas se registre, de conformidad a lo
      establecido en el artículo 43, párrafo tercero de la Constitución
      Nacional.
    </CustomModal>
  );
};

export default ProtectPersonalData;
