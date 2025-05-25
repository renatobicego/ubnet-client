"use client";

import { Tabs, Tab, Spinner } from "@heroui/react";
import { useState, useCallback, useEffect, Suspense } from "react";
import BannerTab from "./Banner/BannerTab";
import { BannerProvider } from "@/context/BannerContext";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { signOut } from "next-auth/react";
import dynamic from "next/dynamic";
const PlansTab = dynamic(() => import("./Plans/PlansTab"));
const PlanZonesTab = dynamic(() => import("./PlanZones/PlanZonesTab"));
const MapSetup = dynamic(() =>
  import("@/components/maps/ZonesMap").then((mod) => mod.MapSetup),
);
const ZoneMapForm = dynamic(() => import("./ZoneMap/ZoneMapForm"));

const TabsForms = () => {
  const [selectedTab, setSelectedTab] = useState("banners");
  const [pendingTabChange, setPendingTabChange] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Function to be called by child components to update editing state
  const updateEditingState = useCallback((editing: boolean) => {
    setIsEditing(editing);
  }, []);

  // Handle tab change with confirmation if needed
  const handleTabChange = (key: string) => {
    if (isEditing) {
      setPendingTabChange(key);
      const confirmAction = confirm(
        "¿Estás seguro de que quieres salir de la edición?",
      );
      if (confirmAction) {
        confirmTabChange();
        return;
      }
      cancelTabChange();
    } else {
      setSelectedTab(key);
    }
  };

  // Confirm tab change
  const confirmTabChange = () => {
    if (pendingTabChange) {
      setSelectedTab(pendingTabChange);
      setPendingTabChange(null);
    }
    setIsEditing(false);
  };

  // Cancel tab change
  const cancelTabChange = () => {
    setPendingTabChange(null);
  };

  // Add beforeunload event listener to prevent accidental navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEditing) {
        // Standard way of showing a confirmation dialog before unload
        e.preventDefault();
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isEditing]);

  return (
    <section
      data-observe
      className="light-section flex w-full flex-col rounded-lg bg-white p-4"
    >
      <PrimaryButton className="self-end" onPress={() => signOut()}>
        Cerrar Sesión
      </PrimaryButton>
      <Tabs
        aria-label="Opciones de administración"
        selectedKey={selectedTab}
        onSelectionChange={(key) => handleTabChange(key as string)}
      >
        <Tab key="banners" title="Banners">
          <BannerProvider>
            <BannerTab onEditingChange={updateEditingState} />
          </BannerProvider>
        </Tab>
        <Tab key="cobertura" title="Cobertura">
          <Suspense fallback={<Spinner color="primary" size="lg" />}>
            <MapSetup>
              <ZoneMapForm onEditingChange={updateEditingState} />
            </MapSetup>
          </Suspense>
        </Tab>
        <Tab key="zones" title="Zonas">
          <Suspense fallback={<Spinner color="primary" size="lg" />}>
            <PlanZonesTab />
          </Suspense>
        </Tab>
        <Tab key="plans" title="Planes">
          <Suspense fallback={<Spinner color="primary" size="lg" />}>
            <PlansTab />
          </Suspense>
        </Tab>
      </Tabs>
    </section>
  );
};

export default TabsForms;
