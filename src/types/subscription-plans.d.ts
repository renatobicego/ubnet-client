export interface SubscriptionPlan {
  _id: string;
  title: string;
  detail: string[];
  price: number;
  isPromotionPlan: boolean;
  isFeature: boolean;
  isActive: boolean;
  uploadDownloadValues: {
    upload: string;
    download: string;
  };
  sideText?: string;
  type?: string;
  region: string;
}
