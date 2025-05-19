import PrimaryButton from "@/components/buttons/PrimaryButton";
import { getPlans } from "@/services/planServices";
import { PostZone, SubscriptionPlan, Zone } from "@/types/subscription-plans";
import { planTypesLabel } from "@/utils/itemsData";
import {
  addToast,
  Form,
  Input,
  Select,
  SelectItem,
  SharedSelection,
} from "@heroui/react";
import { FormEvent, useEffect, useState } from "react";

const PlanZoneForm = ({
  editData,
  onClose,
}: {
  editData?: Zone;
  onClose: () => void;
}) => {
  const [values, setValues] = useState<PostZone>({
    label: editData ? editData.label : "",
    plans: [],
  });
  const [plansSelected, setPlansSelected] = useState<SharedSelection>(
    new Set(editData ? editData.plans.map((plan) => plan._id) : []),
  );
  const [plans, setPlans] = useState<SubscriptionPlan[]>();

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await getPlans();
      setPlans(plans);
    };
    fetchPlans();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const plansUpdated = Array.from(plansSelected) as string[];
    if (plansUpdated.length === 0) {
      addToast({
        title: "Error",
        description: "Debe seleccionar al menos un plan",
        color: "danger",
      });
      return;
    }
    if (values.label.trim().length === 0) {
      addToast({
        title: "Error",
        description: "El nombre de la zona/localidad no puede estar vacío",
        color: "danger",
      });
      return;
    }
    setValues({ ...values, plans: plansUpdated });
  };
  return (
    <Form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <Input
        isRequired
        errorMessage="Este campo es requerido"
        label="Nombre de la Zona"
        labelPlacement="outside"
        name="label"
        onValueChange={(value) => setValues({ ...values, label: value })}
        value={values.label}
        placeholder="Ingrese la zona/localidad"
      />
      <Select
        items={plans || []}
        isLoading={!plans}
        isRequired
        label="Planes disponibles en la zona"
        labelPlacement="outside"
        placeholder="Seleccione un plan"
        selectionMode="multiple"
        classNames={{
          label: "-top-4",
        }}
        selectedKeys={plansSelected}
        onSelectionChange={setPlansSelected}
      >
        {(plan) => (
          <SelectItem key={plan._id} textValue={plan.title}>
            <div className="flex flex-col">
              <span className="text-small">{plan.title}</span>
              <span className="text-tiny text-default-400">
                {planTypesLabel[plan.planType]}
              </span>
            </div>
          </SelectItem>
        )}
      </Select>
      <menu className="mt-4 flex w-full items-center justify-end gap-2 pb-2">
        <PrimaryButton onPress={onClose} color="secondary">
          Cancelar
        </PrimaryButton>
        <PrimaryButton type="submit">Guardar</PrimaryButton>
      </menu>
    </Form>
  );
};

export default PlanZoneForm;
