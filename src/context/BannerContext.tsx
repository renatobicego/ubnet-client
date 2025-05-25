"use client";

import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { ImageBanner } from "@/components/carousel/ImageCarousel";
import { addToast } from "@heroui/react";
import { getAllBanners } from "@/services/bannerServices";

interface BannerContextType {
  banners: ImageBanner[];
  loading: boolean;
  isEditing: {
    editingOrder: boolean;
    editingBannerModalOpen: boolean;
  };
  setBanners: React.Dispatch<React.SetStateAction<ImageBanner[]>>;
  setIsEditing: React.Dispatch<
    React.SetStateAction<{
      editingOrder: boolean;
      editingBannerModalOpen: boolean;
    }>
  >;
  fetchBanners: () => Promise<void>;
  setBannersImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>;
  bannersImagesToDelete: string[];
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [banners, setBanners] = useState<ImageBanner[]>([]);
  const [bannersImagesToDelete, setBannersImagesToDelete] = useState<string[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({
    editingOrder: false,
    editingBannerModalOpen: false,
  });

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const bannersData = await getAllBanners();
      setBanners(bannersData.sort((a, b) => a.order - b.order));
    } catch {
      addToast({
        title: "Error al cargar los banners",
        description: "No se pudieron cargar los banners.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    banners,
    loading,
    isEditing,
    setBanners,
    setIsEditing,
    fetchBanners,
    setBannersImagesToDelete,
    bannersImagesToDelete,
  };

  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  );
};

export const useBannerContext = () => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error("useBannerContext must be used within a BannerProvider");
  }
  return context;
};
