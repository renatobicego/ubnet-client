import { SubscriptionPlan } from "@/types/subscription-plans";

export const mockedPlans: SubscriptionPlan[] = [
  {
    _id: "1",
    title: "Plan Light",
    detail: [
      "Uso recomendado para 2 personas",
      "Orientado a hogares con uso de redes sociales y música",
    ],
    price: 3000,
    isPromotionPlan: false,
    isFeature: false,
    isActive: true,
    uploadDownloadValues: {
      upload: "30 Mb",
      download: "50 Mb",
    },
    region: "default",
    type: "light",
  },
  {
    _id: "2",
    title: "Plan Light",
    detail: [
      "Uso recomendado para 2 personas",
      "Orientado a hogares con uso de redes sociales y música",
    ],
    price: 3000,
    isPromotionPlan: false,
    isFeature: false,
    isActive: true,
    uploadDownloadValues: {
      upload: "30 Mb",
      download: "50 Mb",
    },
    region: "default",
    type: "light",
  },
  {
    _id: "3",
    title: "Plan Light",
    detail: [
      "Uso recomendado para 2 personas",
      "Orientado a hogares con uso de redes sociales y música",
    ],
    price: 3000,
    isPromotionPlan: false,
    isFeature: false,
    isActive: true,
    uploadDownloadValues: {
      upload: "30 Mb",
      download: "50 Mb",
    },
    region: "default",
    type: "light",
  },
  {
    _id: "4",
    title: "Plan Light",
    detail: [
      "Uso recomendado para 2 personas",
      "Orientado a hogares con uso de redes sociales y música",
    ],
    price: 3000,
    isPromotionPlan: false,
    isFeature: false,
    isActive: true,
    uploadDownloadValues: {
      upload: "30 Mb",
      download: "50 Mb",
    },
    region: "default",
    type: "light",
  },
  {
    _id: "5",
    title: "Plan Max",
    detail: [
      "Uso recomendado para 5 personas",
      "Orientado a hogares con uso de redes sociales y música",
    ],
    price: 3000,
    isPromotionPlan: false,
    isFeature: true,
    isActive: true,
    uploadDownloadValues: {
      upload: "30 Mb",
      download: "50 Mb",
    },
    region: "default",
    type: "max",
  },
];
