"use client";
import { Button } from "@heroui/react";
import { FaWhatsapp } from "react-icons/fa6";

const WhatsappButton = () => {
  return (
    <Button
      isIconOnly
      radius="full"
      className="fixed right-4 bottom-4 z-50 p-1 md:right-6 md:bottom-6 md:size-12 lg:right-8 lg:bottom-8 2xl:size-12"
    >
      <FaWhatsapp className="size-6 md:size-8 2xl:size-10" />
    </Button>
  );
};

export default WhatsappButton;
