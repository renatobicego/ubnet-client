import PrimaryButton from "@/components/buttons/PrimaryButton";
import PlanCard from "@/components/cards/PlanCard";
import { createPlan, updatePlan } from "@/services/planServices";
import {
  PlanType,
  PostSecurityPlan,
  SecurityPlan,
  SubscriptionPlan,
} from "@/types/subscription-plans";
import { addToast, Button, Form, Input, Switch } from "@heroui/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const SecurityPlanForm = ({
  editData,
  onClose,
  setPlans,
  planTypeSelected,
}: {
  editData?: SecurityPlan | PostSecurityPlan;
  onClose: () => void;
  setPlans: Dispatch<SetStateAction<SubscriptionPlan[]>>;
  planTypeSelected: Extract<PlanType, "security">;
}) => {
  const details =
    editData &&
    editData.detail &&
    editData.detail.length === 0 &&
    typeof editData.detail[0] === "string"
      ? editData.detail.map((detail) => ({
          text: detail as string,
          id: crypto.randomUUID(),
        }))
      : (editData?.detail as { text: string; id: string }[]);
  const [values, setValues] = useState<PostSecurityPlan>({
    detail: details || [],
    isActive: editData ? editData.isActive : true,
    isFeature: editData ? editData.isFeature : false,
    planType: editData ? editData.planType : planTypeSelected,
    title: editData ? editData.title : "",
    price: editData ? editData.price : 0,
    sideText: editData ? editData.sideText : undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentDetail, setCurrentDetail] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const { detail, title, planType } = values;
    if (detail.length === 0) {
      addToast({
        title: "Error",
        description: "Debe agregar al menos un detalle",
        color: "danger",
      });
      setIsSubmitting(false);
      return;
    }
    if (title.trim().length === 0) {
      addToast({
        title: "Error",
        description: "El nombre del plan no puede estar vacío",
        color: "danger",
      });
      setIsSubmitting(false);
      return;
    }
    if (!planType) {
      addToast({
        title: "Error",
        description: "Debe seleccionar un tipo de plan",
        color: "danger",
      });
      setIsSubmitting(false);
      return;
    }
    if (values.price === 0) {
      addToast({
        title: "Error",
        description: "El precio es requerido",
        color: "danger",
      });
      setIsSubmitting(false);
      return;
    }

    if (currentDetail.length > 0) {
      addToast({
        title: "Detalle no guardado",
        description: 'Debe tocar el botón "+ Agregar" para guardar el detalle',
        color: "warning",
      });
      setIsSubmitting(false);
      return;
    }

    const parsedValues = {
      ...values,
      detail: detail.map((detail) => detail.text),
    };
    try {
      if (editData && "_id" in editData) {
        const updatedPlan = await updatePlan(editData._id, parsedValues);
        setPlans((prevPlans) =>
          prevPlans.map((p) => (p._id === updatedPlan._id ? updatedPlan : p)),
        );
        addToast({
          title: "Plan actualizado",
          description: "El plan ha sido actualizado con éxito",
          color: "success",
        });
        onClose();
      } else {
        const newPlan = await createPlan(parsedValues);
        setPlans((prevPlans) => [...prevPlans, newPlan]);
        addToast({
          title: "Plan creado",
          description: "El plan ha sido creado con éxito",
          color: "success",
        });
        onClose();
      }
    } catch {
      addToast({
        title: "Error al crear/editar el plan",
        description: "No se pudo crear/editar el plan. Inténtalo de nuevo",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addDetail = () => {
    if (currentDetail.trim().length === 0) return;
    setValues((prev) => ({
      ...prev,
      detail: [
        ...prev.detail,
        { text: currentDetail, id: crypto.randomUUID() },
      ],
    }));
    setCurrentDetail("");
  };

  const removeDetail = (id: string) => {
    setValues((prev) => ({
      ...prev,
      detail: prev.detail.filter((detail) => detail.id !== id),
    }));
  };
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-start gap-6">
        <Form
          id="securityPlanForm"
          className="flex flex-1 flex-col gap-2"
          onSubmit={onSubmit}
        >
          <Input
            isRequired
            errorMessage="Este campo es requerido"
            label="Nombre del Plan"
            labelPlacement="outside"
            name="label"
            onValueChange={(value) => setValues({ ...values, title: value })}
            value={values.title}
            placeholder="Ingrese el plan"
          />
          <Input
            isRequired
            errorMessage="Este campo es requerido"
            label="Detalles"
            labelPlacement="outside"
            name="label"
            onValueChange={(value) => setCurrentDetail(value)}
            value={currentDetail}
            placeholder="Ingrese los detalles"
            endContent={
              <Button
                startContent={<FaPlus className="!h-3 !w-3" />}
                size="sm"
                radius="full"
                color="primary"
                className="!w-24 min-w-24"
                onPress={addDetail}
              >
                Agregar
              </Button>
            }
            description="Toque '+ Agregar' para agregar el detalle"
          />
          <Switch
            isSelected={values.isActive}
            classNames={{
              label: "text-small",
            }}
            onChange={(e) =>
              setValues({ ...values, isActive: e.target.checked })
            }
          >
            Plan Activo
          </Switch>

          <Input
            isRequired
            type="number"
            errorMessage="Este campo es requerido"
            label="Precio"
            labelPlacement="outside"
            name="label"
            onValueChange={(value) =>
              setValues({
                ...values,
                price: Number(value),
              })
            }
            pattern="^[0-9.,]*$"
            value={values.price.toString()}
            placeholder="Ingrese el precio"
          />
          <Input
            label="Mensaje de Promoción/Destacado"
            labelPlacement="outside"
            name="label"
            onValueChange={(value) => setValues({ ...values, sideText: value })}
            value={values.sideText}
            placeholder="Ingrese el mensaje"
          />
        </Form>
        <div className={`grid ${values.isFeature ? "w-2/3" : "w-1/2"}`}>
          <PlanCard
            plan={values}
            isMax={values.isFeature}
            disableContactButton
            removeDetail={removeDetail}
          />
        </div>
      </div>
      <menu className="mt-4 flex w-full items-center justify-end gap-2 pb-2">
        <PrimaryButton onPress={onClose} color="secondary">
          Cancelar
        </PrimaryButton>
        <PrimaryButton
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          type="submit"
          form="securityPlanForm"
        >
          Guardar
        </PrimaryButton>
      </menu>
    </div>
  );
};

export default SecurityPlanForm;
