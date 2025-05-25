import { deleteFilesService } from "@/services/uploadthingServices";
import { UploadDropzone } from "@/utils/uploadthing";
import { UT_URL } from "@/utils/urls";
import { addToast, Form, Image, Input } from "@heroui/react";
import { Dispatch, SetStateAction, useState } from "react";

const CreateBannerForm = ({
  setIsNewImageUploaded,
  onSubmit,
  isNewImageUploaded,
}: {
  setIsNewImageUploaded: Dispatch<
    SetStateAction<{
      image: string;
      imageMobile: string;
    }>
  >;
  isNewImageUploaded: { image: string; imageMobile: string };
  onSubmit: (data: { description: string; image: string }) => Promise<boolean>;
}) => {
  const [values, setValues] = useState({
    description: "",
    image: "",
    imageMobile: "",
  });

  return (
    <Form
      id="create-banner"
      onSubmit={async (e) => {
        e.preventDefault();
        const success = await onSubmit(values);
        if (success) setValues({ description: "", image: "", imageMobile: "" });
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex w-full gap-4">
        <UploadDropzone
          endpoint="imageUploader"
          content={{
            allowedContent: "Imagen 8Mb",
            label:
              "Selecciona una imagen o arrastra una aca. Aspecto 3/1 para computadoras",
            button: "Subir imagen",
          }}
          className="ut-button:ut-ready:bg-primary ut-button:ut-readying:bg-primary/60 ut-uploading:cursor-not-allowed ut-button:px-4 flex-1"
          onClientUploadComplete={(res) => {
            if (isNewImageUploaded.image) {
              try {
                deleteFilesService([isNewImageUploaded.image]);
              } catch (error) {
                console.error("Error deleting file:", error);
              }
            }
            setIsNewImageUploaded((prev) => ({
              ...prev,
              image: res[0].key,
            }));
            setValues((prevValues) => ({
              ...prevValues,
              image: res[0].key,
            }));
            addToast({ title: "Imagen subida con éxito", color: "success" });
          }}
          onUploadError={(error: Error) => {
            addToast({
              title: "Error al subir la imagen",
              color: "danger",
              description:
                error.message === `Invalid config: FileSizeMismatch`
                  ? "El archivo es demasiado grande"
                  : error.message,
            });
          }}
          onUploadBegin={() => addToast({ title: "Subiendo imagen..." })}
        />
        {isNewImageUploaded.image && (
          <div className="flex-1">
            <Image
              src={`${UT_URL}/${isNewImageUploaded.image}`}
              alt="Imagen subida"
              classNames={{
                wrapper: "h-full w-full !max-w-full",
                img: "aspect-[3/1] w-full h-auto object-cover",
              }}
            />
          </div>
        )}
      </div>
      <div className="flex w-full gap-4">
        <UploadDropzone
          endpoint="imageUploader"
          content={{
            allowedContent: "Imagen 8Mb",
            label:
              "Selecciona una imagen o arrastra una aca. Aspecto 16/9 para teléfonos",
            button: "Subir imagen",
          }}
          className="ut-button:ut-ready:bg-primary ut-button:ut-readying:bg-primary/60 ut-uploading:cursor-not-allowed ut-button:px-4 flex-1"
          onClientUploadComplete={(res) => {
            if (isNewImageUploaded.imageMobile) {
              try {
                deleteFilesService([isNewImageUploaded.imageMobile]);
              } catch (error) {
                console.error("Error deleting file:", error);
              }
            }
            setIsNewImageUploaded((prev) => ({
              ...prev,
              imageMobile: res[0].key,
            }));
            setValues((prevValues) => ({
              ...prevValues,
              imageMobile: res[0].key,
            }));
          }}
          onUploadError={(error: Error) => {
            addToast({
              title: "Error al subir la imagen",
              color: "danger",
              description:
                error.message === `Invalid config: FileSizeMismatch`
                  ? "El archivo es demasiado grande"
                  : error.message,
            });
          }}
        />
        {isNewImageUploaded.imageMobile && (
          <div className="flex-1">
            <Image
              src={`${UT_URL}/${isNewImageUploaded.imageMobile}`}
              alt="Imagen subida"
              classNames={{
                wrapper: "h-full w-full !max-w-full",
                img: "aspect-video w-full h-auto object-cover",
              }}
            />
          </div>
        )}
      </div>
      <Input
        value={values.description}
        onValueChange={(value) =>
          setValues((prevValues) => ({ ...prevValues, description: value }))
        }
        isRequired
        min={1}
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
