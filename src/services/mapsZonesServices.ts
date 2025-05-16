"use server";
import { ShapeData } from "@/types/maps-types";
import { mockedShapes } from "@/utils/mockdata";
// import axios from "axios";

export const getShapes = async () => {
  return mockedShapes;
};

export const updateShapes = async (shapes: ShapeData[]) => {
  try {
    // await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/shapeData`, shapes);
    console.log("Shapes updated successfully:", shapes);
  } catch {
    throw new Error("Error al actualizar la cobertura");
  }
};
