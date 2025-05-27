"use server";
import { authOptions } from "@/lib/auth";
import {
  PostSecurityPlan,
  PostSubscriptionPlan,
  PostZone,
  SubscriptionPlan,
  Zone,
} from "@/types/subscription-plans";
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
  try {
    const { data }: { data: SubscriptionPlan[] } = await axios.get(
      `${API_URL}/plan`,
    );
    return data;
  } catch (error) {
    console.error("Error fetching zones and plans:", error);
    throw new Error("Error al traer las zonas y planes");
  }
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

export const deleteZone = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/zone/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getServerSession(authOptions).then(
          (res) => res?.backendToken,
        )}`,
      },
    });
  } catch (error) {
    console.error("Error deleting zone:", error);
    throw new Error("Error al borrar la zona");
  }
};

export const createPlan = async (
  plan: Omit<PostSubscriptionPlan | PostSecurityPlan, "detail"> & {
    detail: string[];
  },
) => {
  try {
    const { data }: { data: SubscriptionPlan } = await axios.post(
      `${API_URL}/plan`,
      plan,
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
    console.error("Error creating plan:", error);
    throw new Error("Error al crear el plan");
  }
};

export const updatePlan = async (
  id: string,
  plan: Omit<PostSubscriptionPlan | PostSecurityPlan, "detail"> & {
    detail: string[];
  },
) => {
  try {
    const { data }: { data: SubscriptionPlan } = await axios.put(
      `${API_URL}/plan/${id}`,
      plan,
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
    console.error("Error updating plan:", error);
    throw new Error("Error al actualizar el plan");
  }
};

export const deletePlan = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/plan/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getServerSession(authOptions).then(
          (res) => res?.backendToken,
        )}`,
      },
    });
  } catch (error) {
    console.error("Error deleting plan:", error);
    throw new Error("Error al borrar el plan");
  }
};
