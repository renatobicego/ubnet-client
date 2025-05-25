"use client";
import PrimaryButton from "../buttons/PrimaryButton";
const PlanCard = dynamic(() => import("../cards/PlanCard"));
import { Suspense, useEffect, useState } from "react";
import { Select, SelectItem, Skeleton } from "@heroui/react";
import { PlanType, Zone } from "@/types/subscription-plans";
import { getZonesAndPlans } from "@/services/planServices";
import dynamic from "next/dynamic";

const PlanesGrid = ({
  filters,
}: {
  filters: { id: PlanType; label: string }[];
}) => {
  const [zoneSelected, setZoneSelected] = useState<Zone>();
  const [zones, setZones] = useState<Zone[]>([]);
  const [filterSelected, setFilterSelected] = useState<PlanType>("fiber");

  useEffect(() => {
    const fetchZones = async () => {
      const zones = await getZonesAndPlans();
      setZones(zones);
    };
    fetchZones();
  }, []);

  const plansFiltered = zoneSelected?.plans.filter(
    (plan) => !plan.isFeature && plan.planType === filterSelected,
  );
  const featuredPlans = zoneSelected?.plans.filter(
    (plan) => plan.isFeature && plan.planType === filterSelected,
  );

  return (
    <>
      <Select
        label="Localidad/Barrio"
        className="text-black md:max-w-[80%] lg:max-w-[40%] 2xl:max-w-[30%]"
        radius="lg"
        placeholder="Seleccioná tu zona"
        selectedKeys={[zoneSelected ? zoneSelected._id : ""]}
        onChange={(e) =>
          setZoneSelected(zones.find((zone) => zone._id === e.target.value))
        }
      >
        {zones.map((zone) => (
          <SelectItem key={zone._id}>{zone.label}</SelectItem>
        ))}
      </Select>
      {zoneSelected && (
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
            <Suspense
              fallback={
                <>
                  {plansFiltered?.map((plan) => (
                    <Skeleton
                      key={plan._id}
                      className="h-60 w-full rounded-3xl"
                    />
                  ))}
                </>
              }
            >
              {plansFiltered?.map((plan) => (
                <PlanCard key={plan._id} plan={plan} />
              ))}
            </Suspense>

            <Suspense
              fallback={
                <>
                  {featuredPlans?.map((plan) => (
                    <Skeleton
                      key={plan._id}
                      className="col-span-2 h-36 rounded-3xl"
                    />
                  ))}
                </>
              }
            >
              {featuredPlans?.map((plan) => (
                <PlanCard key={plan._id} plan={plan} isMax={true} />
              ))}
            </Suspense>
          </article>
        </>
      )}
    </>
  );
};

export default PlanesGrid;
