export type PlanType = "fiber" | "5g" | "security";
export interface SubscriptionPlan {
  _id: string;
  title: string;
  detail: string[];
  isPromotionPlan: boolean;
  isFeature: boolean;
  isActive: boolean;
  uploadDownloadValues: {
    upload: string;
    download: string;
  };
  sideText?: string;
  type?: string;
  planType: PlanType;
}

export interface Zone {
  _id: string;
  label: string;
  plans: SubscriptionPlan[];
}
