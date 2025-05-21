import { Zone } from "@/types/subscription-plans";
import { planTypesLabel } from "@/utils/itemsData";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@heroui/react";
import { FaTrash } from "react-icons/fa6";
import PlanZoneModal from "../modals/planZones/PlanZoneModal";
import { Dispatch, SetStateAction, useState } from "react";
import { deleteZone } from "@/services/planServices";

const AdminPlanZoneCard = ({
  zone,
  setZones,
}: {
  zone: Zone;
  setZones: Dispatch<SetStateAction<Zone[]>>;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    const isConfirmed = confirm("¿Estás seguro de eliminar esta zona?");
    if (isConfirmed) {
      setIsDeleting(true);
      try {
        await deleteZone(zone._id);
        setZones((prevZones) => prevZones.filter((z) => z._id !== zone._id));
        addToast({
          color: "success",
          title: "Zona eliminada",
        });
      } catch {
        addToast({
          color: "danger",
          title: "Error al eliminar la zona",
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };
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
        <PlanZoneModal editData={zone} setZones={setZones} />
        <Button
          onPress={handleDelete}
          isLoading={isDeleting}
          isDisabled={isDeleting}
          isIconOnly
          radius="full"
          color="danger"
          variant="flat"
        >
          <FaTrash />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminPlanZoneCard;
