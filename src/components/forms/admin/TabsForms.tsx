"use client";

import { Tabs, Tab } from "@heroui/react";
import { useState, useCallback, useEffect } from "react";
import BannerTab from "./Banner/BannerTab";
import { BannerProvider } from "@/context/BannerContext";
import ZoneMapForm from "./ZoneMap/ZoneMapForm";
import { MapSetup } from "@/components/maps/ZonesMap";
import PlanZonesTab from "./PlanZones/PlanZonesTab";

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
      className="light-section w-full rounded-lg bg-white p-4"
    >
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
          <MapSetup>
            <ZoneMapForm onEditingChange={updateEditingState} />
          </MapSetup>
        </Tab>
        <Tab key="zones" title="Zonas">
          <PlanZonesTab />
        </Tab>
      </Tabs>
    </section>
  );
};

export default TabsForms;
