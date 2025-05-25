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
  const [isNewImageUploaded, setIsNewImageUploaded] = useState({
    image: "",
    imageMobile: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    onOpen();
    setIsEditing((prev) => ({
      ...prev,
      editingBannerModalOpen: true,
    }));
  };

  const handleCancel = async () => {
    if (isNewImageUploaded.image || isNewImageUploaded.imageMobile) {
      // Delete the new image
      try {
        await deleteFilesService([
          isNewImageUploaded.image,
          isNewImageUploaded.imageMobile,
        ]);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
      setIsNewImageUploaded({
        image: "",
        imageMobile: "",
      });
    }
    setIsEditing((prev) => ({
      ...prev,
      editingBannerModalOpen: false,
    }));
    onClose();
  };

  const onSubmit = async (data: {
    description: string;
    image: string;
    imageMobile?: string;
  }) => {
    setIsLoading(true);
    if (!data.description) {
      addToast({
        title: "Por favor, ingresa una descripción",
        description: "No se pudo crear el banner.",
        color: "danger",
      });
      setIsLoading(false);
      return false;
    }
    if (isNewImageUploaded.image) {
      data.image = isNewImageUploaded.image;
      data.imageMobile = isNewImageUploaded.imageMobile;
    } else {
      addToast({
        title: "Por favor, sube una imagen",
        description: "No se pudo crear el banner.",
        color: "danger",
      });
      setIsLoading(false);
      return false;
    }
    try {
      const resData = await createBanner({
        description: data.description,
        imageUrl: data.image,
        mobileImageUrl: data.imageMobile,
        order: banners.length,
      });
      setBanners((prev) => [...prev, resData]);
      addToast({
        title: "Banner creado",
        color: "success",
      });
      setIsEditing((prev) => ({
        ...prev,
        editingBannerModalOpen: false,
      }));
      setIsNewImageUploaded({
        image: "",
        imageMobile: "",
      });
      onClose();
      return true;
    } catch {
      addToast({
        title: "Error al crear el banner",
        description: "No se pudo crear el banner.",
        color: "danger",
      });
      return false;
    } finally {
      setIsLoading(false);
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
        size="5xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Agregar Banner</ModalHeader>
          <ModalBody>
            <CreateBannerForm
              setIsNewImageUploaded={setIsNewImageUploaded}
              onSubmit={onSubmit}
              isNewImageUploaded={isNewImageUploaded}
            />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onPress={handleCancel} color="secondary">
              Cancelar
            </PrimaryButton>
            <PrimaryButton
              isLoading={isLoading}
              isDisabled={isLoading}
              type="submit"
              form="create-banner"
            >
              Agregar Banner
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBanner;
