import { UploadDropzone } from "@/utils/uploadthing";
import { Form, Input } from "@heroui/react";
import { Dispatch, SetStateAction, useState } from "react";

const CreateBannerForm = ({
  setIsNewImageUploaded,
  onSubmit,
}: {
  setIsNewImageUploaded: Dispatch<SetStateAction<string>>;
  onSubmit: (data: { description: string; image: string }) => Promise<void>;
}) => {
  const [values, setValues] = useState({
    description: "",
    image: "",
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
          label: "Selecciona una imagen o arrastra una aca",
        }}
        className="w-full"
        onClientUploadComplete={(res) => {
          setIsNewImageUploaded(res[0].fileHash);
          setValues((prevValues) => ({
            ...prevValues,
            image: res[0].fileHash,
          }));
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

export default CreateBannerForm;
