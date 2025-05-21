import { authOptions } from "@/lib/auth";
import { PostZone, Zone } from "@/types/subscription-plans";
import { mockedPlans } from "@/utils/mockdata";
import { API_URL } from "@/utils/urls";
import axios from "axios";
import { getServerSession } from "next-auth";

export const getZonesAndPlans = async () => {
  try {
    const { data }: { data: Zone[] } = await axios.get(`${API_URL}/zone`);
    return data;
  } catch (error) {
    console.error("Error fetching zones and plans:", error);
    throw new Error("Error al traer las zonas y planes");
  }
};

export const getPlans = async () => {
  return mockedPlans;
};

export const updateZone = async (id: string, zone: PostZone) => {
  try {
    const { data }: { data: Zone } = await axios.put(
      `${API_URL}/zone/${id}`,
      zone,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getServerSession(authOptions).then(
            (res) => res?.backendToken,
          )}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Error updating zone:", error);
    throw new Error("Error al actualizar la zona");
  }
};

export const createZone = async (zone: PostZone) => {
  try {
    const { data }: { data: Zone } = await axios.post(`${API_URL}/zone`, zone, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getServerSession(authOptions).then(
          (res) => res?.backendToken,
        )}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating zone:", error);
    throw new Error("Error al crear la zona");
  }
};
