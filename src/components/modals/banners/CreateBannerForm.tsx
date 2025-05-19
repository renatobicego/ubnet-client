import { UploadDropzone } from "@/utils/uploadthing";
import { addToast, Form, Input } from "@heroui/react";
import { Dispatch, SetStateAction, useState } from "react";

const CreateBannerForm = ({
  setIsNewImageUploaded,
  onSubmit,
}: {
  setIsNewImageUploaded: Dispatch<
    SetStateAction<{
      image: string;
      imageMobile: string;
    }>
  >;
  onSubmit: (data: { description: string; image: string }) => Promise<void>;
}) => {
  const [values, setValues] = useState({
    description: "",
    image: "",
    imageMobile: "",
  });

  return (
    <Form
      id="create-banner"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="flex flex-col gap-4"
    >
      <UploadDropzone
        endpoint="imageUploader"
        content={{
          allowedContent: "Imagen 8Mb",
          label: "Selecciona una imagen o arrastra una aca. Aspecto 3/1",
        }}
        className="w-full"
        onClientUploadComplete={(res) => {
          setIsNewImageUploaded((prev) => ({
            ...prev,
            image: res[0].fileHash,
          }));
          setValues((prevValues) => ({
            ...prevValues,
            image: res[0].fileHash,
          }));
        }}
        onUploadError={(error: Error) => {
          addToast({
            title: "Error al subir la imagen",
            color: "danger",
            description: error.message,
          });
        }}
      />
      <UploadDropzone
        endpoint="imageUploader"
        content={{
          allowedContent: "Imagen 8Mb",
          label: "Selecciona una imagen o arrastra una aca. Aspecto 16/9",
        }}
        className="w-full"
        onClientUploadComplete={(res) => {
          setIsNewImageUploaded((prev) => ({
            ...prev,
            imageMobile: res[0].fileHash,
          }));
          setValues((prevValues) => ({
            ...prevValues,
            imageMobile: res[0].fileHash,
          }));
        }}
        onUploadError={(error: Error) => {
          addToast({
            title: "Error al subir la imagen",
            color: "danger",
            description: error.message,
          });
        }}
      />
      <Input
        value={values.description}
        onValueChange={(value) =>
          setValues((prevValues) => ({ ...prevValues, description: value }))
        }
        label="Descripción"
        labelPlacement="outside"
        name="description"
        placeholder="Ingrese una descripción de la imagen"
        type="text"
      />
    </Form>
  );
};

export default CreateBannerForm;
