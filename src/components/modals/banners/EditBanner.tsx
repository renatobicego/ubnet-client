import {
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
import { Dispatch, SetStateAction, useState } from "react";
import { deleteFilesService } from "@/services/uploadthingServices";
import EditBannerForm from "./EditBannerForm";

const EditBanner = ({
  setIsEditing,
  banner,
}: {
  setIsEditing: Dispatch<
    SetStateAction<{
      editingOrder: boolean;
      editingBannerModalOpen: boolean;
    }>
  >;
  banner: ImageBanner;
}) => {
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Editar Banner</ModalHeader>
          <ModalBody>
            <EditBannerForm
              banner={banner}
              setIsNewImageUploaded={setIsNewImageUploaded}
            />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onPress={handleCancel} color="secondary">
              Cancelar
            </PrimaryButton>
            <PrimaryButton>Guardar Cambios</PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditBanner;
