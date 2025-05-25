"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { cloneElement } from "react";

const CustomModal = ({
  children,
  title,
  button,
}: {
  children: React.ReactNode;
  title: string;
  button: React.ReactElement<{ onPress?: () => void }>;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Clone button and add onPress prop
  const clonedButton = cloneElement(button, {
    onPress: onOpen,
  });

  return (
    <>
      {clonedButton}
      <Modal
        isOpen={isOpen}
        placement="center"
        size="xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-medium text-black">
                {title}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
