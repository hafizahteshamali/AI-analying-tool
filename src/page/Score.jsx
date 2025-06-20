import React, { useState } from "react";
import { FaFile, FaFileUpload } from "react-icons/fa";
import Button from "../components/Button";
import Footer from "../Navigation/Footer";

const Score = () => {
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
      <div className="w-full bg-[#132438] lg:h-[200px] flex flex-col items-center justify-start py-10 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-white text-4xl font-bold">
            Mietvertrag KI-Analyse
          </h1>
          <p className="text-white text-[16px] w-[100%] lg:w-[80%] mx-auto mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
            officiis aliquid dolore unde sequi eius, officia ipsa. Sunt in
            consectetur dolorum iure fuga deleniti alias nesciunt asperiores.
            Magnam, aliquam quos!
          </p>
        </div>
      </div>

      <div className="container mx-auto">
        <form className="mt-10 rounded-md w-[90%] lg:w-[70%] mx-auto">
          <div className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center flex flex-col justify-center items-center">
            <p className="mb-4 font-semibold text-gray-800">
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
                className="cursor-pointer bg-[#0055a5] text-white h-[50px] w-[80%] lg:w-[40%] flex justify-center items-center rounded hover:bg-blue-700"
              >
                Datei auswählen
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

          <div className="flex justify-between items-center gap-2 w-[100%] mt-8">
            <div className="w-[50%] flex justify-start items-center gap-2.5">
              {fileName ? (
                <>
                  <FaFile className="text-7xl text-gray-500" />
                  <label>{fileName.slice(0, 20)}...</label>
                </>
              ) : (
                <>
                  <FaFileUpload className="text-7xl text-gray-500" />
                  <label className="text-gray-500 text-[18px]">
                    File Upload
                  </label>
                </>
              )}
            </div>

            <a href="#" download className="text-blue-600">
              Download
            </a>
          </div>
        </form>

        <div className="w-[90%] lg:w-[70%] mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Ergebnisse der Analyse
          </h1>

          <div className="flex justify-between items-center my-4">
            <span>Risiko-Score</span>
            <span>75%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="progress-container progress-shimmer">
            {/* Progress Fill Bar */}
            <div
              className="bg-amber-500 h-full rounded-md progress-fill"
              style={{ zIndex: 2, position: "relative" }}
            ></div>
          </div>
        </div>

        <div className="w-[90%] lg:w-[70%] mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            zusammenfassung der Analyse
          </h1>
          <p className="my-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            quisquam consequatur non nemo, optio minus quibusdam aspernatur
            iste, beatae illum fugiat sapiente natus alias cum dignissimos. Eos
            molestias soluta rem?
          </p>
        </div>

        <div className="w-[90%] lg:w-[70%] mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Klauselbewertung
          </h1>

          <div className="w-[100%] my-4 border border-gray-500 rounded-md">
            <div className="flex justify-start items-center bg-white p-2 border-b border-gray-500 rounded-md">
              <div className="w-[50%]">
                <p>Mieter muss die Wande streician</p>
              </div>
              <span className="bg-[#ff00005e] text-red-500 px-2">illegal</span>
            </div>
            <div className="flex justify-start items-center bg-white p-2 border-b border-gray-500 rounded-md">
              <div className="w-[50%]">
                <p>Mieter muss die Wande streician</p>
              </div>
              <span className="bg-[#ffff005d] text-yellow-500 px-2">
                Fragwordig
              </span>
            </div>
            <div className="flex justify-start items-center bg-white p-2 border-b border-gray-500 rounded-md">
              <div className="w-[50%]">
                <p>Mieter muss die Wande streician</p>
              </div>
              <span className="bg-[#00800063] text-green-500 px-2">
                illegal
              </span>
            </div>
          </div>
        </div>

        <div className="w-[90%] lg:w-[70%] mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800">Eingabefeld:</h1>
          <p>Tatsachliche Monatsmiete $275</p>

          <div className="p-2 w-full border border-gray-500 rounded-md my-4 flex-col justify-center items-center">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="w-full lg:w-[50%] text-center lg:text-left">
                <p>Ausgabe (nach Berechnung)</p>
              </div>
              <span>+14 % über dem Wiener Mietspiegel</span>
            </div>

            {/* Animated Progress Bar */}
            <div className="progress-container progress-shimmer mt-4">
              <div
                className="bg-amber-500 h-full rounded-md progress-fill"
                style={{ zIndex: 2, position: "relative" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="w-[90%] my-10 lg:w-[90%] mx-auto flex flex-col lg:flex-row justify-center gap-10 items-center">
          <Button
            className="h-[50px] w-[80%] md:w-[40%] lg:w-[30%] bg-[#186DEE] text-white border-none rounded-md outline-none"
            text="PDF-Bericht herunterladen"
            onclick=""
          />
          <Button
            className="h-[50px] w-[80%] md:w-[40%] lg:w-[30%] border-2 border-[#186DEE] text-black rounded-md"
            text="PDF-Bericht herunterladen"
            onclick=""
          />
        </div>

        <div className="w-[90%] my-10 lg:w-[90%] mx-auto">
          <p className="text-[18px] w-[50%] mx-auto text-[#CACBCB] text-center">
            Dieses Tool ersetzt keine Rechtsberatung. Alle Angaben ohne Gewähr.
          </p>
        </div>
      </div>

      <div className="bg-[#132438]">
        <div className="container mx-auto ">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Score;
