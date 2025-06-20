import { useState } from "react";
import Button from "./Button";

const UploadRentalComp = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  return (
    <>
      <form className="mt-10 rounded-md w-[100%] lg:w-[80%] mx-auto">
        <div className="border-7 border-dashed border-[var(--secondary-color)] p-6 rounded-4xl bg-[#E5E7EB] min-h-[300px] text-center flex flex-col justify-center items-center">
          <p className="text-[18px] lg:text-2xl text-[var(--secondary-color)] font-[600] my-2">
            Drag & Drop oder Dateiauswahl
          </p>
          <p className="mt-2 mb-4 text-[18px] font-semibold text-[var(--secondary-color)]">
            PDF, DOCX, JPG – max. 5 MB
          </p>
          <input
            type="file"
            accept=".pdf,.docx,.jpg,.jpeg"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <div className="flex flex-col justify-center lg:flex-row w-full items-center gap-5">
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-[var(--para-color)] text-white h-[60px] w-[100%] sm:w-[80%] lg:w-[40%] flex justify-center items-center rounded-full hover:bg-[#20203d]
                             text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]"
            >
              Laden Sie Ihren Vertrag hoch
            </label>
            {fileName && (
              <Button
                type="submit"
                className="h-[50px] w-[80%] lg:w-[40%] bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
                text="Analyse starten"
              ></Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadRentalComp;
