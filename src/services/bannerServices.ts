"use server";
import { ImageBanner } from "@/components/carousel/ImageCarousel";
import { API_URL } from "@/utils/urls";
import axios from "axios";

export const getAllBanners = async () => {
  try {
    const { data }: { data: ImageBanner[] } = await axios.get(
      `${API_URL}/banner/all`,
    );
    return data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw new Error("Error al traer los banners");
  }
};
