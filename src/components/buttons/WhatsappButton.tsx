"use client";
import { Button, Link } from "@heroui/react";
import { FaWhatsapp } from "react-icons/fa6";

const WhatsappButton = () => {
  return (
    <Button
      isIconOnly
      color="secondary"
      as={Link}
      href="https://wa.me/+542974262219"
      target="_blank"
      radius="full"
      className="fixed right-6 bottom-6 z-50 p-1 md:size-12 lg:right-8 lg:bottom-8 2xl:size-12"
    >
      <FaWhatsapp className="text-primary size-6 md:size-8 2xl:size-10" />
    </Button>
  );
};

export default WhatsappButton;
