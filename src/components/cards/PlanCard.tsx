import type {
  PostSecurityPlan,
  PostSubscriptionPlan,
  SubscriptionPlan,
} from "@/types/subscription-plans";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import PrimaryButton from "../buttons/PrimaryButton";
import PlanFormModal from "../modals/plans/PlanFormModal";
import { Dispatch, SetStateAction } from "react";
import { FaTrash } from "react-icons/fa6";

interface PlanCardProps {
  plan: SubscriptionPlan | PostSubscriptionPlan | PostSecurityPlan;
  isMax?: boolean;
  setPlans?: Dispatch<SetStateAction<SubscriptionPlan[]>>;
  isFormPlan?: boolean;
  disableContactButton?: boolean;
  removeDetail?: (id: string) => void;
}

const PlanDetailsList = ({
  details,
  className,
  removeDetail,
}: {
  details: string[] | { text: string; id: string }[];
  className?: string;
  removeDetail?: (id: string) => void;
}) => {
  if (details.length === 0) return null;

  if (typeof details[0] === "object") {
    const detailsParsed = details as { text: string; id: string }[];
    return (
      <ul className={`${className}`}>
        {detailsParsed.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-1 overflow-visible"
          >
            <li className="mt-1.5">{item.text}</li>
            <Button
              onPress={() => removeDetail && removeDetail(item.id)}
              size="sm"
              color="danger"
              radius="full"
              variant="light"
              className="!p-0.5"
              isIconOnly
            >
              <FaTrash />
            </Button>
          </div>
        ))}
      </ul>
    );
  }
  return (
    <ul className={`${className}`}>
      {details.map((item, index) => (
        <li key={index}>{item.toString()}</li>
      ))}
    </ul>
  );
};

export default function PlanCard({
  plan,
  isMax = false,
  setPlans,
  isFormPlan = false,
  disableContactButton = false,
  removeDetail,
}: PlanCardProps) {
  if (plan.planType === "fiber" || plan.planType === "5g") {
    if (isMax) {
      return (
        <Card className="bg-primary col-span-2 flex flex-col items-center justify-between gap-2 rounded-3xl border border-white p-6 px-8 text-white md:flex-row md:items-end">
          <CardHeader className="w-fit flex-col items-start gap-4 p-0 md:max-lg:max-w-1/2">
            <h2 className="title-3 font-semibold xl:font-medium">
              {plan.title}
            </h2>
            {plan.sideText && (
              <Chip
                size="lg"
                color="secondary"
                className="text-primary max-md:text-base"
              >
                {plan.sideText}
              </Chip>
            )}
            <PlanDetailsList
              details={plan.detail}
              className="list-inside list-disc space-y-1 text-sm"
              removeDetail={removeDetail}
            />
          </CardHeader>
          {isFormPlan && (
            <Chip className="absolute top-4 right-4">
              {plan.isActive ? "Plan Activo" : "Plan Inactivo"}
            </Chip>
          )}
          <CardBody className="flex flex-1 flex-col items-start gap-4 overflow-hidden p-0 md:items-end">
            <div className="flex items-center gap-4 max-md:w-full max-md:justify-between">
              {isFormPlan && setPlans ? (
                <PlanFormModal editData={plan} setPlans={setPlans} isMax />
              ) : (
                <PrimaryButton
                  size="lg"
                  color="secondary"
                  className="text-primary md:order-last"
                  isDisabled={disableContactButton}
                >
                  ¡Lo quiero!
                </PrimaryButton>
              )}
              <UploadDownloadValues
                download={plan.uploadDownloadValues.download}
                upload={plan.uploadDownloadValues.upload}
              />
            </div>
          </CardBody>
        </Card>
      );
    }
    return (
      <Card className="text-primary col-span-1 gap-2 overflow-hidden rounded-3xl bg-white px-8 py-6 md:gap-4">
        <CardHeader className="flex flex-col items-start gap-4 p-0">
          <h2 className="title-3 font-semibold xl:font-medium">{plan.title}</h2>
          {plan.sideText && (
            <Chip size="lg" color="primary" className="max-md:text-base">
              {plan.sideText}
            </Chip>
          )}
          {isFormPlan && (
            <Chip className="absolute top-4 right-4">
              {plan.isActive ? "Plan Activo" : "Plan Inactivo"}
            </Chip>
          )}
        </CardHeader>
        <CardBody className="overflow-hidden p-0">
          <PlanDetailsList
            details={plan.detail}
            removeDetail={removeDetail}
            className="mb-4 ml-2 list-inside list-disc space-y-1 text-sm text-black/60"
          />
        </CardBody>
        <CardFooter className="justify-between p-0">
          {isFormPlan && setPlans ? (
            <PlanFormModal editData={plan} setPlans={setPlans} />
          ) : (
            <PrimaryButton isDisabled={disableContactButton}>
              ¡Lo quiero!
            </PrimaryButton>
          )}
          <UploadDownloadValues
            download={plan.uploadDownloadValues.download}
            upload={plan.uploadDownloadValues.upload}
          />
        </CardFooter>
      </Card>
    );
  }
  if (plan.planType === "security") {
    return (
      <Card className="text-primary col-span-1 gap-2 overflow-hidden rounded-3xl bg-white px-8 py-6 md:gap-4">
        <CardHeader className="flex flex-col items-start gap-4 p-0">
          <h2 className="title-3 font-semibold xl:font-medium">{plan.title}</h2>
          {plan.sideText && (
            <Chip size="lg" color="primary" className="max-md:text-base">
              {plan.sideText}
            </Chip>
          )}
          {isFormPlan && (
            <Chip className="absolute top-4 right-4">
              {plan.isActive ? "Plan Activo" : "Plan Inactivo"}
            </Chip>
          )}
        </CardHeader>
        <CardBody className="overflow-hidden p-0">
          <PlanDetailsList
            details={plan.detail}
            removeDetail={removeDetail}
            className="mb-4 ml-2 list-inside list-disc space-y-1 text-sm text-black/60"
          />
        </CardBody>
        <CardFooter className="justify-between p-0">
          <Price price={plan.price} />
          {isFormPlan && setPlans ? (
            <PlanFormModal editData={plan} setPlans={setPlans} />
          ) : (
            <PrimaryButton isDisabled={disableContactButton}>
              ¡Lo quiero!
            </PrimaryButton>
          )}
        </CardFooter>
      </Card>
    );
  }
}

const Price = ({ price }: { price: number }) => {
  return (
    <div className="flex items-end gap-1">
      <h3 className="text-3xl font-bold lg:text-4xl 2xl:text-5xl">${price}</h3>
      <div className="mb-0.5 max-w-10 text-xs leading-4 lg:text-sm">
        por mes
      </div>
    </div>
  );
};

const UploadDownloadValues = ({
  download,
  upload,
}: {
  download: string;
  upload: string;
}) => {
  return (
    <div className="flex justify-between gap-4 p-3 text-center">
      <div>
        <p className="text-sm font-bold">{download}</p>
        <p className="text-sm">Descarga</p>
      </div>
      <div>
        <p className="text-sm font-bold">{upload}</p>
        <p className="text-sm">Subida</p>
      </div>
    </div>
  );
};
