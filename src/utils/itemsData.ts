import { PlanType } from "@/types/subscription-plans";

export const planTypesLabel: Record<PlanType, string> = {
  fiber: "Fibra",
  "5g": "5G",
  security: "Cámaras",
};

export const planTypesOptions: { id: PlanType; label: string }[] = [
  { id: "fiber", label: "Fibra" },
  { id: "5g", label: "5G" },
  { id: "security", label: "Cámaras" },
];
