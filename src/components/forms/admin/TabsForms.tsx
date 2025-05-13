"use client";

import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { useState, useCallback, useEffect } from "react";
import BannerTab from "./Banner/BannerTab";
import { BannerProvider } from "@/context/BannerContext";

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
    <section className="w-full rounded-lg bg-white p-4">
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
        <Tab key="music" title="Music">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="videos" title="Videos">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </section>
  );
};

export default TabsForms;
