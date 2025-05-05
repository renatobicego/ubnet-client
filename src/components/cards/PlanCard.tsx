import type { SubscriptionPlan } from "@/types/subscription-plans";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import PrimaryButton from "../buttons/PrimaryButton";

interface PlanCardProps {
  plan: SubscriptionPlan;
  isMax?: boolean;
}

export default function PlanCard({ plan, isMax = false }: PlanCardProps) {
  if (isMax) {
    return (
      <Card className="bg-primary col-span-2 flex flex-col items-center justify-between gap-2 rounded-3xl border border-white p-6 px-8 text-white md:flex-row md:items-end">
        <CardHeader className="w-fit flex-col items-start gap-4 p-0 md:max-lg:max-w-1/2">
          <h2 className="title-3 font-semibold xl:font-medium">{plan.title}</h2>
          <ul className="list-inside list-disc space-y-1 text-sm">
            {plan.detail.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardHeader>
        <CardBody className="flex flex-1 flex-col items-start gap-4 overflow-hidden p-0 md:items-end">
          <div className="flex items-center gap-4 max-md:w-full max-md:justify-between">
            <PrimaryButton
              size="lg"
              color="secondary"
              className="text-primary md:order-last"
            >
              ¡Lo quiero!
            </PrimaryButton>
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
      <CardHeader className="p-0">
        <h2 className="title-3 font-semibold xl:font-medium">{plan.title}</h2>
      </CardHeader>
      <CardBody className="overflow-hidden p-0">
        <ul className="mb-4 ml-2 list-inside list-disc space-y-1 text-sm text-black/60">
          {plan.detail.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="justify-between p-0">
        <PrimaryButton>¡Lo quiero!</PrimaryButton>
        <UploadDownloadValues
          download={plan.uploadDownloadValues.download}
          upload={plan.uploadDownloadValues.upload}
        />
      </CardFooter>
    </Card>
  );
}

// const Price = ({ price }: { price: number }) => {
//   return (
//     <div className="flex items-end gap-1">
//       <h3 className="text-3xl font-bold lg:text-4xl 2xl:text-5xl">${price}</h3>
//       <div className="mb-0.5 max-w-10 text-xs leading-4 lg:text-sm">
//         por mes
//       </div>
//     </div>
//   );
// };

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
