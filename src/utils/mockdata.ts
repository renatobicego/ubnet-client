import { ShapeData } from "@/types/maps-types";
import { SubscriptionPlan, Zone } from "@/types/subscription-plans";

export const mockedPlans: SubscriptionPlan[] = [
  {
    _id: "1",
    title: "Plan Light",
    detail: [
      "Uso recomendado para 2 personas",
      "Orientado a hogares con uso de redes sociales y música",
    ],
    isFeature: false,
    isActive: true,
    uploadDownloadValues: {
      upload: "30 Mb",
      download: "50 Mb",
    },
    planType: "fiber",
  },
  {
    _id: "2",
    title: "Plan Light",
    detail: [
      "Uso recomendado para 2 personas",
      "Orientado a hogares con uso de redes sociales y música",
    ],
    isFeature: false,
    isActive: true,
    uploadDownloadValues: {
      upload: "30 Mb",
      download: "50 Mb",
    },
    planType: "fiber",
  },
  {
    _id: "3",
    title: "Plan Light",
    detail: [
      "Uso recomendado para 2 personas",
      "Orientado a hogares con uso de redes sociales y música",
    ],
    isFeature: false,
    sideText: "Promoción 10% off",
    isActive: true,
    uploadDownloadValues: {
      upload: "30 Mb",
      download: "50 Mb",
    },
    planType: "5g",
  },
  {
    _id: "4",
    title: "Plan Light",
    detail: [
      "Uso recomendado para 2 personas",
      "Orientado a hogares con uso de redes sociales y música",
    ],
    isFeature: false,
    isActive: true,
    uploadDownloadValues: {
      upload: "30 Mb",
      download: "50 Mb",
    },
    planType: "5g",
  },
  {
    _id: "5",
    title: "Plan Max",
    detail: [
      "Uso recomendado para 5 personas",
      "Orientado a hogares con uso de redes sociales y música",
    ],
    isFeature: true,
    sideText: "Promoción 10% off",
    isActive: true,
    uploadDownloadValues: {
      upload: "30 Mb",
      download: "50 Mb",
    },
    planType: "fiber",
  },
  {
    planType: "security",
    _id: "6",
    title: "Plan Light",
    detail: [
      "Uso recomendado para 2 personas",
      "Orientado a hogares con uso de redes sociales y musica",
    ],
    isFeature: false,
    isActive: true,
    price: 100,
    sideText: "Promoción 10% off",
  },
  {
    planType: "security",
    _id: "7",
    title: "Plan Light",
    detail: [
      "Uso recomendado para 2 personas",
      "Orientado a hogares con uso de redes sociales y musica",
    ],
    isFeature: false,
    isActive: true,
    price: 200,
  },
];

export const mockedZones: Zone[] = [
  { _id: "1", label: "Zona 1", plans: mockedPlans },
  { _id: "2", label: "Zona 2", plans: mockedPlans },
];

export const mockedShapes: ShapeData[] = [
  {
    clientId: Math.random().toString(),
    type: "CIRCLE",
    _id: "1",
    circle: {
      center: {
        lat: 37.7749,
        lng: -122.4194,
      },
      radius: 100000,
    },
  },
  {
    clientId: Math.random().toString(),
    type: "POLYGON",
    _id: "2",
    polygon: {
      path: [
        {
          lat: 56.7749,
          lng: -122.4194,
        },
        {
          lat: 37.7749,
          lng: -122.4194,
        },
        {
          lat: 37.7749,
          lng: -70.4194,
        },
        {
          lat: 56.7749,
          lng: -70.4194,
        },
      ],
    },
  },
];
