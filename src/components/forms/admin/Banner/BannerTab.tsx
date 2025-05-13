"use client";

import { useEffect } from "react";
import BannerVisualizer from "./BannerVisualizer";
import { useBannerContext } from "@/context/BannerContext";
import CreateBanner from "@/components/modals/banners/CreateBanner";

interface BannerTabProps {
  onEditingChange?: (isEditing: boolean) => void;
}

const BannerTab = ({ onEditingChange }: BannerTabProps) => {
  const { isEditing, fetchBanners } = useBannerContext();
  // Update parent component about editing state
  useEffect(() => {
    if (onEditingChange) {
      onEditingChange(
        isEditing.editingOrder || isEditing.editingBannerModalOpen,
      );
    }
  }, [isEditing, onEditingChange]);

  useEffect(() => {
    fetchBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <CreateBanner />
      <BannerVisualizer />
    </div>
  );
};

export default BannerTab;
