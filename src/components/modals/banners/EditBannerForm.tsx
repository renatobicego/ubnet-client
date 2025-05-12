import { ImageBanner } from "@/components/carousel/ImageCarousel";
import { UploadDropzone } from "@/utils/uploadthing";
import { Form, Input } from "@heroui/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

const EditBannerForm = ({
  banner,
  setIsNewImageUploaded,
}: {
  banner: ImageBanner;
  setIsNewImageUploaded: Dispatch<SetStateAction<string>>;
}) => {
  const [values, setValues] = useState({
    description: banner.description,
    image: banner.imageUrl,
  });
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
  };
  return (
    <Form onSubmit={onSubmit} className="flex flex-col gap-4">
      <UploadDropzone
        endpoint="imageUploader"
        content={{
          allowedContent: "Imagen 8Mb",
          label: "Selecciona una imagen o arrastra una aca",
        }}
        className="w-full"
        onClientUploadComplete={(res) => {
          setIsNewImageUploaded(res[0].fileHash);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name);
        }}
        onChange={(acceptedFiles) => {
          // Do something with the accepted files
          console.log("Accepted files: ", acceptedFiles);
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

export default EditBannerForm;
