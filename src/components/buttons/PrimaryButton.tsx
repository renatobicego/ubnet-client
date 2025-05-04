"use client";
import { Button, ButtonProps } from "@heroui/react";
import React from "react";

export interface PrimaryButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  ...props
}) => {
  const colorText = props.color === "secondary" ? "text-black" : "text-white";
  const fontSize =
    props.size === "sm"
      ? "text-sm"
      : props.size === "lg"
        ? "text-lg"
        : "text-base";
  return (
    <Button
      radius="full"
      color="primary"
      {...props}
      className={`px-7 py-3 font-medium ${colorText} hover:!opacity-100 max-md:text-sm ${fontSize} ${props.className}`}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
