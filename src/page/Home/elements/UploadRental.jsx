import { useState } from "react";
import { FaFile, FaFileUpload } from "react-icons/fa";
import Button from "../../../components/Button";
import UploadRentalComp from "../../../components/UploadRentalComp";

const UploadRental = ({ uploadRentalData }) => {
  const { heading, para } = uploadRentalData;

  return (
    <div className="w-full bg-[var(--primary-color)]">
      <div className="container mx-auto flex justify-center items-center">
        <div className="my-[70px] p-3">
          <h1 className="w-[100%] md:w-[80%] lg:w-[50%] mx-auto text-center text-[var(--secondary-color)] text-3xl font-bold">
            {heading}
          </h1>
          <p className="w-[100%] md:w-[80%] lg:w-[50%] text-[16px] mx-auto text-center my-6 text-[var(--secondary-color)]">
            {para}
          </p>

          <UploadRentalComp />
        </div>
      </div>
    </div>
  );
};

export default UploadRental;
