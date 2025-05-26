"use server";
import { authOptions } from "@/lib/auth";
import { ShapeData } from "@/types/maps-types";
import { API_URL } from "@/utils/urls";
import axios from "axios";
import { getServerSession } from "next-auth";

export const getShapes = async () => {
  try {
    const { data }: { data: ShapeData[] } = await axios.get(
      `${API_URL}/shapeData`,
      {
        fetchOptions: {
          cache: "no-cache",
        },
      },
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data shape:", error);
    throw new Error("Error al traer las zonas de cobertura");
  }
};

export const updateShapes = async (shapes: ShapeData[]) => {
  try {
    console.log(shapes.map((shape) => shape));
    await axios.post(`${API_URL}/shapeData`, shapes, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getServerSession(authOptions).then(
          (res) => res?.backendToken,
        )}`,
      },
    });
  } catch (error) {
    console.error("Error updating shapes:", error);
    throw new Error("Error al actualizar la cobertura");
  }
};

export const deleteShapes = async (ids: string[]) => {
  try {
    await axios.delete(`${API_URL}/shapeData`, {
      data: ids,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getServerSession(authOptions).then(
          (res) => res?.backendToken,
        )}`,
      },
    });
  } catch (error) {
    console.error("Error deleting shape:", error);
    throw new Error("Error al eliminar la zona de cobertura");
  }
};
