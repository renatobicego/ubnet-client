export type PlanType = "fiber" | "5g" | "security";

export type BasePlanProps = {
  _id: string;
  title: string;
  detail: string[];
  isActive: boolean;
  sideText?: string;
  isFeature: boolean;
};

interface FiberOr5GPlan extends BasePlanProps {
  uploadDownloadValues: {
    upload: string;
    download: string;
  };
  planType: Extract<PlanType, "fiber" | "5g">;
}

interface SecurityPlan extends BasePlanProps {
  price: number;
  planType: Extract<PlanType, "security">;
}

export type SubscriptionPlan = FiberOr5GPlan | SecurityPlan;

export interface PostSubscriptionPlan {
  title: string;
  detail: {
    text: string;
    id: string;
  }[];
  isFeature: boolean;
  isActive: boolean;
  uploadDownloadValues: {
    upload: string;
    download: string;
  };
  sideText?: string;
  planType: Extract<PlanType, "fiber" | "5g">;
}

export interface PostSecurityPlan {
  title: string;
  detail: {
    text: string;
    id: string;
  }[];
  isFeature: boolean;
  isActive: boolean;
  price: number;
  sideText?: string;
  planType: Extract<PlanType, "security">;
}

export interface Zone {
  _id: string;
  label: string;
  plans: SubscriptionPlan[];
}

export interface PostZone {
  label: string;
  plans: string[];
}
