import PrimaryButton from "@/components/buttons/PrimaryButton";
import { createPlan, updatePlan } from "@/services/planServices";
import {
  PlanType,
  PostSubscriptionPlan,
  SubscriptionPlan,
} from "@/types/subscription-plans";
import { planTypesOptions } from "@/utils/itemsData";
import { addToast, Form, Input, Select, SelectItem } from "@heroui/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

const PlanForm = ({
  editData,
  onClose,
  setPlans,
}: {
  editData?: SubscriptionPlan;
  onClose: () => void;
  setPlans: Dispatch<SetStateAction<SubscriptionPlan[]>>;
}) => {
  const [values, setValues] = useState<PostSubscriptionPlan>({
    detail: editData ? editData.detail : [],
    isActive: editData ? editData.isActive : true,
    isFeature: editData ? editData.isFeature : false,
    isPromotionPlan: editData ? editData.isPromotionPlan : false,
    planType: editData ? editData.planType : "fiber",
    title: editData ? editData.title : "",
    uploadDownloadValues: {
      download: editData ? editData.uploadDownloadValues.download : "",
      upload: editData ? editData.uploadDownloadValues.upload : "",
    },
    sideText: editData ? editData.sideText : undefined,
    type: editData ? editData.type : undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const { detail, title, planType, uploadDownloadValues } = values;
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
        description: "El nombre de la zona/localidad no puede estar vacío",
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
    if (
      uploadDownloadValues.download.trim().length === 0 ||
      uploadDownloadValues.upload.trim().length === 0
    ) {
      addToast({
        title: "Error",
        description: "Los valores de descarga y subida no pueden estar vacíos",
        color: "danger",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      if (editData) {
        const updatedPlan = await updatePlan(editData._id, values);
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
        const newPlan = await createPlan(values);
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
  return (
    <Form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <Input
        isRequired
        errorMessage="Este campo es requerido"
        label="Nombre de la Zona"
        labelPlacement="outside"
        name="label"
        onValueChange={(value) => setValues({ ...values, title: value })}
        value={values.title}
        placeholder="Ingrese la zona/localidad"
      />
      <Select
        items={planTypesOptions}
        isRequired
        label="Planes disponibles en la zona"
        labelPlacement="outside"
        placeholder="Seleccione un plan"
        classNames={{
          label: "-top-4",
        }}
        onChange={(e) =>
          setValues({ ...values, planType: e.target.value as PlanType })
        }
        value={values.planType}
      >
        {(plan) => (
          <SelectItem key={plan.id} textValue={plan.label}>
            {plan.label}
          </SelectItem>
        )}
      </Select>
      <menu className="mt-4 flex w-full items-center justify-end gap-2 pb-2">
        <PrimaryButton onPress={onClose} color="secondary">
          Cancelar
        </PrimaryButton>
        <PrimaryButton
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          type="submit"
        >
          Guardar
        </PrimaryButton>
      </menu>
    </Form>
  );
};

export default PlanForm;
