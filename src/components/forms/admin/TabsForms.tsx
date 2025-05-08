"use client";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import React from "react";
import BannerTab from "./Banner/BannerTab";

const TabsForms = () => {
  return (
    <section className="w-full rounded-lg bg-white p-4">
      <Tabs aria-label="Opciones de administración">
        <Tab key="banners" title="Banners">
          <BannerTab />
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
