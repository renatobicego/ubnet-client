import { ImageBanner } from "@/components/carousel/ImageCarousel";
import { deleteFilesService } from "@/services/uploadthingServices";
import { UploadDropzone } from "@/utils/uploadthing";
import { UT_URL } from "@/utils/urls";
import { addToast, Form, Image, Input } from "@heroui/react";
import { Dispatch, SetStateAction, useState } from "react";

const EditBannerForm = ({
  banner,
  setIsNewImageUploaded,
  onSubmit,
  isNewImageUploaded,
}: {
  banner: ImageBanner;
  setIsNewImageUploaded: Dispatch<
    SetStateAction<{
      image: string;
      imageMobile: string;
    }>
  >;
  onSubmit: (data: {
    description: string;
    image: string;
    imageMobile: string;
  }) => Promise<void>;
  isNewImageUploaded: {
    image: string;
    imageMobile: string;
  };
}) => {
  const [values, setValues] = useState({
    description: banner.description,
    image: banner.imageUrl,
    imageMobile: banner.mobileImageUrl || "",
  });

  return (
    <Form
      id="edit-banner"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex gap-4">
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
            addToast({ title: "Imagen cambiada con éxito", color: "success" });
          }}
          onUploadError={(error: Error) => {
            addToast({
              title: "Error al subir la imagen",
              color: "danger",
              description: error.message,
            });
          }}
          onUploadBegin={() => addToast({ title: "Subiendo imagen..." })}
        />
        {isNewImageUploaded.image && (
          <Image
            src={`${UT_URL}/${isNewImageUploaded.image}`}
            alt="Imagen subida"
            removeWrapper
            className="aspect-[3/1]"
            width={300}
            height={100}
          />
        )}
      </div>
      <div className="flex gap-4">
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
              description: error.message,
            });
          }}
        />
        {isNewImageUploaded.imageMobile && (
          <Image
            src={`${UT_URL}/${isNewImageUploaded.imageMobile}`}
            alt="Imagen subida"
            className="aspect-video"
            removeWrapper
            width={300}
            height={169}
          />
        )}
      </div>
      <Input
        value={values.description}
        onValueChange={(value) =>
          setValues((prevValues) => ({ ...prevValues, description: value }))
        }
        isRequired
        label="Descripción"
        labelPlacement="outside"
        name="description"
        placeholder="Ingrese una descripción de la imagen"
        type="text"
      />
    </Form>
  );
};

export default EditBannerForm;
