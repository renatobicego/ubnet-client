import PrimaryButton from "@/components/buttons/PrimaryButton";
import { SubscriptionPlan } from "@/types/subscription-plans";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { FaPencil } from "react-icons/fa6";
import { Dispatch, SetStateAction } from "react";
import PlanForm from "@/components/forms/admin/Plans/PlanForm";

const PlanFormModal = ({
  editData,
  setPlans,
}: {
  editData?: SubscriptionPlan;
  setPlans: Dispatch<SetStateAction<SubscriptionPlan[]>>;
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
            {editData ? `Editar Plan: ${editData.title}` : "Crear Plan"}
          </ModalHeader>
          <ModalBody>
            <PlanForm
              editData={editData}
              onClose={onClose}
              setPlans={setPlans}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlanFormModal;
