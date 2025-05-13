"use server";
import {
  ImageBanner,
  PostImageBanner,
} from "@/components/carousel/ImageCarousel";
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

export const createBanner = async (
  banner: PostImageBanner,
): Promise<ImageBanner> => {
  try {
    const { data } = await axios.post(`${API_URL}/banner`, banner);
    return data;
  } catch (error) {
    console.error("Error creating banner:", error);
    throw new Error("Error al crear el banner");
  }
};

export const updateBanners = async (
  banners: ImageBanner[],
): Promise<ImageBanner[]> => {
  try {
    const { data } = await axios.put(`${API_URL}/banner`, banners);
    return data;
  } catch (error) {
    console.error("Error updating banners:", error);
    throw new Error("Error al actualizar los banners");
  }
};
