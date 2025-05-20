"use server";
import {
  ImageBanner,
  PostImageBanner,
} from "@/components/carousel/ImageCarousel";
import { authOptions } from "@/lib/auth";
import { API_URL } from "@/utils/urls";
import axios, { AxiosError } from "axios";
import { getServerSession } from "next-auth";

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
    const { data } = await axios.post(`${API_URL}/banner`, banner, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getServerSession(authOptions).then(
          (res) => res?.backendToken,
        )}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating banner:", (error as AxiosError).response);
    throw new Error("Error al crear el banner");
  }
};

export const updateBanners = async (
  banners: ImageBanner[],
): Promise<ImageBanner[]> => {
  try {
    const { data } = await axios.put(`${API_URL}/banner`, banners, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getServerSession(authOptions).then(
          (res) => res?.backendToken,
        )}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error updating banners:", error);
    throw new Error("Error al actualizar los banners");
  }
};

export const deleteBanner = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/banner/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getServerSession(authOptions).then(
          (res) => res?.backendToken,
        )}`,
      },
    });
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw new Error("Error al borrar el banner");
  }
};
