import { Zone } from "@/types/subscription-plans";
import { planTypesLabel } from "@/utils/itemsData";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { FaTrash } from "react-icons/fa6";
import PlanZoneModal from "../modals/planZones/PlanZoneModal";

const AdminPlanZoneCard = ({ zone }: { zone: Zone }) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <h4 className="font-semibold">{zone.label}</h4>
      </CardHeader>
      <CardBody>
        <ul>
          {zone.plans.map((plan) => (
            <li key={plan._id} className="flex items-center gap-2">
              <span>- {plan.title}</span>
              <span className="text-gray-500 italic">
                {planTypesLabel[plan.planType]}
              </span>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="gap-2">
        <PlanZoneModal editData={zone} />
        <Button isIconOnly radius="full" color="danger" variant="flat">
          <FaTrash />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminPlanZoneCard;
