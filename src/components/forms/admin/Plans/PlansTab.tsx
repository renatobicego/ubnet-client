import PrimaryButton from "@/components/buttons/PrimaryButton";
import PlanCard from "@/components/cards/PlanCard";
import PlanFormModal from "@/components/modals/plans/PlanFormModal";
import { getPlans } from "@/services/planServices";
import { PlanType, SubscriptionPlan } from "@/types/subscription-plans";
import { addToast } from "@heroui/react";
import { useEffect, useState } from "react";

const PlansTab = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [filterSelected, setFilterSelected] = useState<PlanType>("fiber");
  const filters: { id: PlanType; label: string }[] = [
    { id: "fiber", label: "Ubnet Fiber" },
    { id: "5g", label: "Microondas 5G" },
    { id: "security", label: "Cámaras de Seguridad" },
  ];

  const fetchPlanes = async () => {
    try {
      const plans = await getPlans();
      setPlans(plans);
    } catch {
      addToast({
        color: "danger",
        title: "Error al cargar las zonas",
      });
    }
  };
  useEffect(() => {
    fetchPlanes();
  }, []);
  const plansFiltered = plans.filter(
    (plan) => !plan.isFeature && plan.planType === filterSelected,
  );
  const featuredPlans = plans.filter(
    (plan) => plan.isFeature && plan.planType === filterSelected,
  );
  return (
    <section className="flex w-full flex-col items-start gap-4">
      <h3 className="title-3">Planes</h3>
      <PlanFormModal setPlans={setPlans} />
      <div className="flex w-full flex-col gap-4">
        <div
          data-observe={true}
          className="mx-auto mb-8 flex w-fit flex-wrap justify-center gap-2 rounded-2xl px-8 py-4"
        >
          {filters.map((filter) => (
            <PrimaryButton
              key={filter.id}
              color={filterSelected === filter.id ? "primary" : "secondary"}
              onPress={() => setFilterSelected(filter.id)}
              variant={filterSelected === filter.id ? "solid" : "bordered"}
              className={`border-primary ${filterSelected === filter.id ? "text-white" : "text-primary"}`}
            >
              {filter.label}
            </PrimaryButton>
          ))}
        </div>

        <article
          data-observe={true}
          className="light-section w-full flex-col gap-6 max-md:flex md:grid md:grid-cols-2 lg:grid-cols-2"
        >
          {plansFiltered?.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              isFormPlan
              setPlans={setPlans}
            />
          ))}

          {featuredPlans?.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              isMax={true}
              isFormPlan
              setPlans={setPlans}
            />
          ))}
        </article>
      </div>
    </section>
  );
};

export default PlansTab;
