import AdminPlanZoneCard from "@/components/cards/AdminPlanZoneCard";
import PlanZoneModal from "@/components/modals/planZones/PlanZoneModal";
import { getZonesAndPlans } from "@/services/planServices";
import { Zone } from "@/types/subscription-plans";
import { addToast } from "@heroui/react";
import { useEffect, useState } from "react";

const PlanZonesTab = () => {
  const [zones, setZones] = useState<Zone[]>([]);

  const fetchZones = async () => {
    try {
      const zones = await getZonesAndPlans();
      setZones(zones);
    } catch {
      addToast({
        color: "danger",
        title: "Error al cargar las zonas",
      });
    }
  };
  useEffect(() => {
    fetchZones();
  }, []);
  return (
    <section className="flex w-full flex-col items-start gap-4">
      <h3 className="title-3">Zonas de Planes</h3>
      <PlanZoneModal />
      <div className="grid w-full grid-cols-4 gap-2">
        {zones.map((zone) => (
          <AdminPlanZoneCard key={zone._id} zone={zone} />
        ))}
      </div>
    </section>
  );
};

export default PlanZonesTab;
