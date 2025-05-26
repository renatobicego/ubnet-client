import PrimaryButton from "@/components/buttons/PrimaryButton";
import {
  PlanType,
  PostSecurityPlan,
  PostSubscriptionPlan,
  SubscriptionPlan,
} from "@/types/subscription-plans";
import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { Dispatch, SetStateAction, useState } from "react";
import PlanForm from "@/components/forms/admin/Plans/PlanForm";
import { planTypesOptions } from "@/utils/itemsData";
import SecurityPlanForm from "@/components/forms/admin/Plans/SecurityPlanForm";
import { deletePlan } from "@/services/planServices";

const PlanFormModal = ({
  editData,
  setPlans,
  isMax,
}: {
  editData?: SubscriptionPlan | PostSubscriptionPlan | PostSecurityPlan;
  setPlans: Dispatch<SetStateAction<SubscriptionPlan[]>>;
  isMax?: boolean;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const [planTypeSelected, setPlanTypeSelected] = useState<
    PlanType | undefined
  >(editData?.planType || undefined);
  const handleDelete = async () => {
    const isConfirmed = confirm("¿Estás seguro de eliminar este plan?");
    if (isConfirmed && typeof editData === "object" && "_id" in editData) {
      setIsDeleting(true);
      try {
        await deletePlan(editData?._id || "");
        addToast({
          color: "success",
          title: "Plan eliminado",
        });
        setPlans((prev) => prev.filter((plan) => plan._id !== editData?._id));
      } catch {
        addToast({
          color: "danger",
          title: "Error al eliminar el plan",
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };
  return (
    <>
      {editData ? (
        <menu className="flex items-center gap-2">
          <Button
            onPress={onOpen}
            isIconOnly
            color={isMax ? "secondary" : "primary"}
            radius="full"
          >
            <FaPencil className={isMax ? "text-primary" : ""} />
          </Button>
          <Button
            onPress={handleDelete}
            isLoading={isDeleting}
            isDisabled={isDeleting}
            isIconOnly
            radius="full"
            color="danger"
            variant={isMax ? "solid" : "flat"}
          >
            <FaTrash />
          </Button>
        </menu>
      ) : (
        <PrimaryButton onPress={onOpen}>Crear Plan</PrimaryButton>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        classNames={{
          base: "max-h-[80vh] w-[80vw] max-w-screen-xl",
        }}
      >
        <ModalContent>
          <ModalHeader>
            {editData ? `Editar Plan: ${editData.title}` : "Crear Plan"}
          </ModalHeader>
          <ModalBody className="mb-4">
            <Select
              items={planTypesOptions}
              isRequired
              className="max-w-[50%]"
              label="Tipo de Plan"
              labelPlacement="outside"
              isDisabled={editData ? true : false}
              placeholder="Seleccione un tipo plan"
              classNames={{
                label: "-top-4",
              }}
              onChange={(e) => setPlanTypeSelected(e.target.value as PlanType)}
              value={planTypeSelected}
              selectedKeys={[planTypeSelected || ""]}
            >
              {(plan) => (
                <SelectItem key={plan.id} textValue={plan.label}>
                  {plan.label}
                </SelectItem>
              )}
            </Select>
            {planTypeSelected === "5g" || planTypeSelected === "fiber" ? (
              <PlanForm
                editData={editData as PostSubscriptionPlan}
                onClose={onClose}
                setPlans={setPlans}
                planTypeSelected={planTypeSelected}
              />
            ) : (
              planTypeSelected === "security" && (
                <SecurityPlanForm
                  editData={editData as PostSecurityPlan}
                  onClose={onClose}
                  setPlans={setPlans}
                  planTypeSelected="security"
                />
              )
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlanFormModal;
