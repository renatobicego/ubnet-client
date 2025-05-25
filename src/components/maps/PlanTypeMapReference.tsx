"use client";
import { Chip } from "@heroui/react";
import React from "react";

const PlanTypeMapReference = () => {
  return (
    <menu className="z-10 mb-4 flex gap-2 rounded-2xl bg-white p-4 max-md:border max-md:border-gray-300 md:absolute md:bottom-8 md:left-8 md:shadow-lg">
      <Chip
        startContent={<span className="ml-2 size-3 bg-[#DE5753]"> </span>}
        className="border-[#DE5753] text-[#DE5753] max-[400px]:text-xs"
        variant="bordered"
      >
        Ubnet Fiber
      </Chip>
      <Chip
        startContent={<span className="bg-primary ml-2 size-3"> </span>}
        color="primary"
        className="max-[400px]:text-xs"
        variant="bordered"
      >
        Microondas 5G
      </Chip>
    </menu>
  );
};

export default PlanTypeMapReference;
