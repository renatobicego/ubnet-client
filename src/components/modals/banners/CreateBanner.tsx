import {
  addToast,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import PrimaryButton from "../../buttons/PrimaryButton";
import { useState } from "react";
import { deleteFilesService } from "@/services/uploadthingServices";
import { useBannerContext } from "@/context/BannerContext";
import CreateBannerForm from "./CreateBannerForm";
import { createBanner } from "@/services/bannerServices";

const CreateBanner = () => {
  const { setIsEditing, setBanners, banners } = useBannerContext();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isNewImageUploaded, setIsNewImageUploaded] = useState("");

  const handleOpen = () => {
    onOpen();
    setIsEditing((prev) => ({
      ...prev,
      editingBannerModalOpen: true,
    }));
  };

  const handleCancel = async () => {
    if (isNewImageUploaded) {
      // Delete the new image
      try {
        await deleteFilesService([isNewImageUploaded]);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
      setIsNewImageUploaded("");
    }
    setIsEditing((prev) => ({
      ...prev,
      editingBannerModalOpen: false,
    }));
    onClose();
  };

  const onSubmit = async (data: { description: string; image: string }) => {
    if (isNewImageUploaded) {
      data.image = isNewImageUploaded;
    } else {
      addToast({
        title: "Por favor, sube una imagen",
        description: "No se pudo crear el banner.",
        color: "danger",
      });
      return;
    }
    try {
      const resData = await createBanner({
        description: data.description,
        imageUrl: data.image,
        order: banners.length,
      });
      setBanners((prev) => [...prev, resData]);
      onClose();
    } catch {
      addToast({
        title: "Error al crear el banner",
        description: "No se pudo crear el banner.",
        color: "danger",
      });
      return;
    }
  };
  return (
    <>
      <PrimaryButton onPress={handleOpen} className="mb-4">
        Agregar banner
      </PrimaryButton>
      <Modal
        classNames={{
          wrapper: "z-[1000]",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Agregar Banner</ModalHeader>
          <ModalBody>
            <CreateBannerForm
              setIsNewImageUploaded={setIsNewImageUploaded}
              onSubmit={onSubmit}
            />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onPress={handleCancel} color="secondary">
              Cancelar
            </PrimaryButton>
            <PrimaryButton type="submit" form="create-banner">
              Agregar Banner
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBanner;
