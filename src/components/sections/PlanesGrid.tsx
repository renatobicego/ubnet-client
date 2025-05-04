"use client";
import { mockedPlans } from "@/utils/mockdata";
import PrimaryButton from "../buttons/PrimaryButton";
import PlanCard from "../cards/PlanCard";
import { useState } from "react";

const PlanesGrid = ({
  filters,
}: {
  filters: { id: string; label: string }[];
}) => {
  const [filterSelected, setFilterSelected] = useState<string>("fiber");
  return (
    <>
      <div
        data-observe={true}
        className="mb-8 flex w-full flex-wrap justify-center gap-2"
      >
        {filters.map((filter) => (
          <PrimaryButton
            key={filter.id}
            color={filterSelected === filter.id ? "secondary" : "primary"}
            onPress={() => setFilterSelected(filter.id)}
            variant={filterSelected === filter.id ? "solid" : "bordered"}
            className={`border-white ${filterSelected === filter.id ? "text-primary" : ""}`}
          >
            {filter.label}
          </PrimaryButton>
        ))}
      </div>

      <article
        data-observe={true}
        className="light-section w-full flex-col gap-6 max-md:flex md:grid md:grid-cols-2 lg:grid-cols-2"
      >
        {mockedPlans
          .filter((plan) => !plan.isFeature)
          .map((plan) => (
            <PlanCard key={plan._id} plan={plan} />
          ))}

        {mockedPlans
          .filter((plan) => plan.isFeature)
          .map((plan) => (
            <PlanCard key={plan._id} plan={plan} isMax={true} />
          ))}
      </article>
    </>
  );
};

export default PlanesGrid;
