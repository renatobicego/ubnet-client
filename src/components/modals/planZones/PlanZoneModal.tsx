import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Zone } from "@/types/subscription-plans";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { FaPencil } from "react-icons/fa6";
import PlanZoneForm from "./PlanZoneForm";
import { Dispatch, SetStateAction } from "react";

const PlanZoneModal = ({
  editData,
  setZones,
}: {
  editData?: Zone;
  setZones: Dispatch<SetStateAction<Zone[]>>;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      {editData ? (
        <Button onPress={onOpen} isIconOnly color="primary" radius="full">
          <FaPencil />
        </Button>
      ) : (
        <PrimaryButton onPress={onOpen}>Crear Zona</PrimaryButton>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            {editData ? `Editar Zona: ${editData.label}` : "Crear Zona"}
          </ModalHeader>
          <ModalBody>
            <PlanZoneForm
              editData={editData}
              onClose={onClose}
              setZones={setZones}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlanZoneModal;
