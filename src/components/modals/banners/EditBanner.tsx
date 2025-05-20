import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { FaPencil } from "react-icons/fa6";
import PrimaryButton from "../../buttons/PrimaryButton";
import { ImageBanner } from "../../carousel/ImageCarousel";
import { useState } from "react";
import { deleteFilesService } from "@/services/uploadthingServices";
import EditBannerForm from "./EditBannerForm";
import { useBannerContext } from "@/context/BannerContext";

const EditBanner = ({ banner }: { banner: ImageBanner }) => {
  const { setIsEditing, setBanners } = useBannerContext();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isNewImageUploaded, setIsNewImageUploaded] = useState({
    image: "",
    imageMobile: "",
  });

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
    imageMobile: string;
  }) => {
    if (!data.description) {
      addToast({
        title: "Por favor, ingresa una descripción",
        description: "No se pudo editar el banner.",
        color: "danger",
      });
      return;
    }
    if (isNewImageUploaded.image) {
      data.image = isNewImageUploaded.image;
    }
    if (isNewImageUploaded.imageMobile) {
      data.imageMobile = isNewImageUploaded.imageMobile;
    }

    setBanners((prev) =>
      prev.map((b) => {
        if (b._id === banner._id) {
          return {
            ...b,
            description: data.description as string,
            imageUrl: data.image as string,
            mobileImageUrl: data.imageMobile as string,
          };
        }
        return b;
      }),
    );
    setIsEditing({
      editingOrder: true,
      editingBannerModalOpen: false,
    });
    onClose();
  };
  return (
    <>
      <Button
        color="primary"
        onPress={handleOpen}
        isIconOnly
        radius="full"
        size="sm"
      >
        <FaPencil />
      </Button>
      <Modal
        classNames={{
          wrapper: "z-[1000]",
        }}
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Editar Banner</ModalHeader>
          <ModalBody>
            <EditBannerForm
              banner={banner}
              setIsNewImageUploaded={setIsNewImageUploaded}
              onSubmit={onSubmit}
              isNewImageUploaded={isNewImageUploaded}
            />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onPress={handleCancel} color="secondary">
              Cancelar
            </PrimaryButton>
            <PrimaryButton type="submit" form="edit-banner">
              Guardar Cambios
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditBanner;
