"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaClipboard,
  FaFile,
  FaFileSignature,
  FaFileUpload,
  FaUserCircle,
} from "react-icons/fa";
import Button from "../components/Button";
import Header from "../Navigation/Header";
import { AipostReq } from "../api/AiAnalyticsAxios";
import { IoCalendarNumberOutline, IoLocationOutline } from "react-icons/io5";
import { PiBedBold } from "react-icons/pi";
import { MdEuro } from "react-icons/md";
import { FiAlertCircle, FiFileText } from "react-icons/fi";
import { FaShield } from "react-icons/fa6";

const Score = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isResponse, setIsResponse] = useState(null);
  const [isIllegal, setIsIllegal] = useState([]);
  const [isQuestionable, setIsQuestionable] = useState([]);
  const [islegal, setIslegal] = useState([]);
  const [animatedRiskScore, setAnimatedRiskScore] = useState(0);
  const [animatedRentScore, setAnimatedRentScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isStructureResponse, setIsStructureResponse] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("loginToken");
    if (token) {
      setIsAllowed(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (isResponse?.risk_score_percentage && !showAnimation) {
      setShowAnimation(true);
      const riskTarget =
        Number.parseInt(isResponse.risk_score_percentage, 10) || 0;
      const rentTarget =
        Number.parseInt(isResponse?.rent_comparison?.percent, 10) || 0;

      setAnimatedRiskScore(0);
      setAnimatedRentScore(0);

      setTimeout(() => {
        let riskCurrent = 0;
        let rentCurrent = 0;
        const duration = 2000;
        const steps = 50;
        const riskIncrement = riskTarget / steps;
        const rentIncrement = rentTarget / steps;
        const stepDuration = duration / steps;

        const riskInterval = setInterval(() => {
          riskCurrent += riskIncrement;
          if (riskCurrent >= riskTarget) {
            riskCurrent = riskTarget;
            clearInterval(riskInterval);
          }
          setAnimatedRiskScore(Math.round(riskCurrent));
        }, stepDuration);

        const rentInterval = setInterval(() => {
          rentCurrent += rentIncrement;
          if (rentCurrent >= rentTarget) {
            rentCurrent = rentTarget;
            clearInterval(rentInterval);
          }
          setAnimatedRentScore(Math.round(rentCurrent));
        }, stepDuration);

        return () => {
          clearInterval(riskInterval);
          clearInterval(rentInterval);
        };
      }, 100);
    }
  }, [isResponse, showAnimation]);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const maxSizeInBytes = 10 * 1024 * 1024;
      if (selectedFile.size > maxSizeInBytes) {
        alert("Datei ist zu groß. Maximum 10MB erlaubt.");
        e.target.value = "";
        return;
      }

      const allowedExtensions = [
        "pdf",
        "docx",
        "doc",
        "jpg",
        "jpeg",
        "png",
        "tiff",
      ];
      const fileName = selectedFile.name.toLowerCase();
      const fileExtension = fileName.split(".").pop();

      if (!allowedExtensions.includes(fileExtension)) {
        alert(
          "Ungültiger Dateityp. Nur PDF, DOCX, DOC, JPG, JPEG, PNG und TIFF sind erlaubt."
        );
        e.target.value = "";
        return;
      }

      const allowedMimeTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/tiff",
      ];

      if (
        !allowedMimeTypes.includes(selectedFile.type) &&
        selectedFile.type !== ""
      ) {
        alert(
          "Ungültiger Dateityp. Nur PDF, DOCX, DOC, JPG, JPEG, PNG und TIFF sind erlaubt."
        );
        e.target.value = "";
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  }, []);

  const handleUpload = useCallback(
    async (e) => {
      e.preventDefault();
      if (!file) {
        alert("Bitte wählen Sie eine Datei aus.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        const response = await AipostReq("/analyze", formData);
        console.log("✅ Upload Response:", response);

        const clauses = response?.data?.clauses_german || {};
        setIsIllegal(clauses.illegal || []);
        setIsQuestionable(clauses.questionable || []);
        setIslegal(clauses.legal || []);

        const responseData = response?.data || null;
        setIsResponse(responseData);
        setIsStructureResponse(responseData?.structured_summary_json);

        setShowAnimation(false);
      } catch (error) {
        console.error("❌ Upload Error:", error);
        alert(
          "Fehler beim Hochladen der Datei. Bitte versuchen Sie es erneut."
        );
      } finally {
        setUploading(false);
      }
    },
    [file]
  );

  const handleNewAnalysis = useCallback(() => {
    setFile(null);
    setFileName("");
    setIsResponse(null);
    setIsIllegal([]);
    setIsQuestionable([]);
    setIslegal([]);
    setAnimatedRiskScore(0);
    setAnimatedRentScore(0);
    setShowAnimation(false);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
  }, []);

  const structuredSummary = useMemo(() => {
    return isResponse?.structured_summary_json || {};
  }, [isResponse]);

  const riskScoreColor = useMemo(() => {
    if (animatedRiskScore > 70) {
      return "linear-gradient(90deg, #ef4444, #dc2626)";
    } else if (animatedRiskScore > 40) {
      return "linear-gradient(90deg, #f59e0b, #d97706)";
    }
    return "linear-gradient(90deg, #10b981, #059669)";
  }, [animatedRiskScore]);

  if (!isAllowed) return null;

  return (
    <div className="w-full">
      <div className="bg-[#132438] flex flex-col items-center justify-start py-10 px-4">
        <div className="container mx-auto min-h-[500px]">
          <Header />
          <div className="text-center h-[300px] my-[50px] flex flex-col justify-center items-center">
            <h1 className="text-white text-4xl font-bold">
              Mietvertrag KI-Analyse
            </h1>
            <p className="text-white text-[16px] w-[100%] lg:w-[80%] mx-auto mt-4">
              Unsere Lösung liest und versteht Mietverträge automatisch, erkennt
              kritische Klauseln im Kontext aktueller OGH-Urteile und
              Gesetzeslagen, vergleicht die Miete mit dem aktuellen Index und
              zeigt Risiken klar verständlich an – Nutzer:innen können auf
              Knopfdruck einen vollständigen Prüfbericht erstellen oder direkt
              rechtliche Unterstützung anfordern
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-5">
        <form
          className="mt-10 rounded-md w-[100%] lg:w-[90%] mx-auto"
          onSubmit={handleUpload}
        >
          <div className="border-2 border-dashed border-gray-400 min-h-[300px] p-6 rounded-lg text-center flex flex-col justify-center items-center">
            <p className="mb-4 font-semibold text-gray-800">
              PDF, DOCX, DOC, JPG, JPEG, PNG, TIFF – max. 10 MB
            </p>
            <input
              type="file"
              accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.tiff"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              disabled={uploading}
            />
            <div className="flex flex-col justify-center lg:flex-row w-full items-center gap-5">
              <label
                htmlFor="fileInput"
                className={`cursor-pointer bg-[#0055a5] text-white h-[50px] w-[80%] lg:w-[40%] flex justify-center items-center rounded hover:bg-blue-700 transition-colors duration-300 ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Datei auswählen
              </label>
              {fileName && (
                <button
                  type="submit"
                  disabled={uploading}
                  className={`h-[50px] w-[80%] lg:w-[40%] text-white py-2 rounded transition-colors duration-300 ${
                    uploading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Analysiere...
                    </span>
                  ) : (
                    "Analyse starten"
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center gap-2 w-[100%] mt-8">
            <div className="w-[50%] flex justify-start items-center gap-2.5">
              {fileName ? (
                <>
                  <FaFile className="text-7xl text-gray-500" />
                  <label className="break-all">
                    {fileName.length > 20
                      ? `${fileName.slice(0, 20)}...`
                      : fileName}
                  </label>
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
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
              onClick={() => {
                /* Add download functionality */
              }}
            >
              Download
            </button>
          </div>
        </form>

        {isResponse && (
          <div>
            <div className="w-[100%] lg:w-[90%] mx-auto mt-8">
              <h1 className="text-2xl lg:text-4xl my-3 font-semibold text-[var(--black-color)]">
                Zusammenfassung der Analyse
              </h1>

              <div className="my-5">
                <h1 className="text-2xl font-[500] text-[var(--black-color)]">
                  Vertragsübersicht
                </h1>
                <div className="flex flex-col lg:flex-row justify-start items-center lg:gap-5">
                  {structuredSummary?.parties?.landlord && (
                    <div className="w-[100%] lg:w-[30%] flex rounded-md my-5 justify-start items-center gap-4 p-2 border border-gray-300">
                      <div className="h-full flex justify-center items-center">
                        <FaUserCircle className="text-4xl text-[var(--black-color)]" />
                      </div>
                      <div>
                        <h1 className="text-[20px] font-[500]">
                          {structuredSummary.parties.landlord}
                        </h1>
                      </div>
                    </div>
                  )}
                  {structuredSummary?.parties?.tenant && (
                    <div className="w-[100%] lg:w-[30%] flex rounded-md my-5 justify-start items-center gap-4 p-2 border border-gray-300">
                      <div className="h-full flex justify-center items-center">
                        <FaUserCircle className="text-4xl text-[var(--black-color)]" />
                      </div>
                      <div>
                        <h1 className="text-[20px] font-[500]">
                          {structuredSummary.parties.tenant}
                        </h1>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between items-start mb-5">
                {structuredSummary?.residential_property && (
                  <div className="w-[100%] lg:w-auto">
                    <h2 className="text-2xl font-[500] text-[var(--black-color)] my-4">
                      Wohnobjekt
                    </h2>
                    <div className="border border-gray-300 rounded-lg py-5 px-10 flex flex-col gap-5">
                      {structuredSummary.residential_property.address && (
                        <div className="w-[100%] flex justify-start gap-3 items-center pb-4 border-b-2 border-gray-300">
                          <div>
                            <IoLocationOutline className="text-4xl text-[var(--black-color)]" />
                          </div>
                          <div>
                            <p className="font-[500]">
                              {structuredSummary.residential_property.address}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="w-[100%] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 lg:gap-0">
                        {structuredSummary.residential_property.rooms && (
                          <div className="flex justify-start gap-3 items-center">
                            <div>
                              <PiBedBold className="text-4xl text-[var(--black-color)]" />
                            </div>
                            <div>
                              <p className="font-[500]">
                                {structuredSummary.residential_property.rooms}
                              </p>
                            </div>
                          </div>
                        )}
                        {structuredSummary.residential_property.size && (
                          <div className="flex justify-center items-center gap-2 bg-[var(--green-color)] rounded-md py-1 px-2 text-[var(--white-color)]">
                            <img
                              src="/assets/images/Admin/white-house.png"
                              className="h-[30px] w-[30px] object-contain"
                              alt="House icon"
                            />
                            <p className="font-[500]">
                              {structuredSummary.residential_property.size}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {structuredSummary?.rental_period_costs && (
                  <div className="w-[100%] lg:w-[57%] mt-5">
                    <h2 className="text-2xl font-[500] text-[var(--black-color)] my-4">
                      Mietzeit & Kosten
                    </h2>
                    <div className="border border-gray-300 rounded-lg py-5 px-10 flex flex-col gap-5">
                      <div className="w-[100%] flex justify-start gap-3 items-center pb-4 border-b-2 border-gray-300">
                        <div className="w-full flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div>
                              <IoCalendarNumberOutline className="text-4xl text-[var(--black-color)]" />
                            </div>
                            {structuredSummary.rental_period_costs
                              .start_date && (
                              <div>
                                <p className="font-[500]">
                                  {
                                    structuredSummary.rental_period_costs
                                      .start_date
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        {structuredSummary.rental_period_costs.duration && (
                          <span className="bg-[#EFEFEF] rounded-full flex text-center w-[200px] justify-center text-[12px] items-center px-2 py-1 font-[500]">
                            {structuredSummary.rental_period_costs.duration}
                          </span>
                        )}
                      </div>
                      <div className="w-[100%] flex justify-between flex-wrap items-center">
                        {structuredSummary.rental_period_costs.rent && (
                          <div className="flex justify-start gap-3 items-center">
                            <div>
                              <MdEuro className="text-4xl text-[var(--black-color)]" />
                            </div>
                            <div>
                              <p className="font-[500]">
                                {structuredSummary.rental_period_costs.rent}
                              </p>
                            </div>
                          </div>
                        )}
                        {structuredSummary.rental_period_costs.deposit && (
                          <div className="flex justify-center items-center gap-4 bg-[var(--green-color)] py-1 rounded-md px-2 lg:w-[30%] my-3 lg:my-0 text-[var(--white-color)]">
                            <img
                              src="/assets/images/Admin/cash.png"
                              className="h-[40px] w-[40px] object-contain"
                              alt="Cash icon"
                            />
                            <p className="font-[500] text-[13px]">
                              {structuredSummary.rental_period_costs.deposit}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Regulations Section - Flexbox Version */}
              <div className="w-full bg-[var(--green-color)] my-[50px] rounded-4xl overflow-hidden shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Regulations Column */}
                    <div className="flex-1 flex flex-col space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-[#288C81] rounded-lg">
                          <FiFileText className="text-white h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-semibold text-white">
                          Regelungen
                        </h2>
                      </div>

                      <div className="space-y-4">
                        {isStructureResponse?.regulations?.map((reg, index) => (
                          <div
                            key={index}
                            className="bg-[#288C81]/90 hover:bg-[#288C81] transition-all duration-300 rounded-xl p-6 shadow-md"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                <FaCheckCircle className="text-green-200 h-5 w-5" />
                              </div>
                              <p className="text-white text-sm leading-relaxed">
                                {reg}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Return & Written Form Column */}
                    <div className="flex-1 flex flex-col space-y-6 lg:border-l lg:border-r lg:border-[#288C81] lg:px-8">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-[#288C81] rounded-lg">
                          <FaClipboard className="text-white h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-semibold text-white">
                          Rückgabe & Schriftform
                        </h2>
                      </div>

                      <div className="space-y-4">
                        {isStructureResponse?.backspace_written_form?.map(
                          (bwf, index) => (
                            <div
                              key={index}
                              className="bg-[#288C81]/90 hover:bg-[#288C81] transition-all duration-300 rounded-xl p-6 shadow-md"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                  <FaFileSignature className="text-green-200 h-5 w-5" />
                                </div>
                                <p className="text-white text-sm leading-relaxed">
                                  {bwf}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Duties Column */}
                    <div className="flex-1 flex flex-col space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-[#288C81] rounded-lg">
                          <FaShield className="text-white h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-semibold text-white">
                          Pflichten
                        </h2>
                      </div>

                      <div className="space-y-4">
                        {isStructureResponse?.duties?.map((duties, index) => (
                          <div
                            key={index}
                            className="bg-[#288C81]/90 hover:bg-[#288C81] transition-all duration-300 rounded-xl p-6 shadow-md"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                <FiAlertCircle className="text-green-200 h-5 w-5" />
                              </div>
                              <p className="text-white text-sm leading-relaxed">
                                {duties}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[100%] lg:w-[90%] mx-auto mt-8">
                <h1 className="text-2xl lg:text-4xl font-semibold text-gray-800">
                  Ergebnisse der Analyse
                </h1>
                <div className="flex justify-between items-center my-4">
                  <span className="text-lg font-medium">Risiko-Score</span>
                  <span className="text-lg font-bold text-orange-600">
                    {animatedRiskScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                  <div
                    className="h-full rounded-full transition-all duration-[3000ms] ease-out"
                    style={{
                      width: `${Math.min(animatedRiskScore, 100)}%`,
                      background: riskScoreColor,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      transformOrigin: "left center",
                    }}
                  >
                    <div className="h-full w-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="w-[100%] lg:w-[90%] mx-auto mt-8">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Klauselbewertung
                </h1>
                <div className="w-[100%] my-4 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                  {isIllegal.length > 0 && (
                    <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                      <div className="w-[70%]">
                        {isIllegal.map((ill, index) => (
                          <p key={index} className="text-gray-800 mb-2">
                            {ill}
                          </p>
                        ))}
                      </div>
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                        illegal
                      </span>
                    </div>
                  )}
                  {isQuestionable.length > 0 && (
                    <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                      <div className="w-[70%]">
                        {isQuestionable.map((ques, index) => (
                          <p key={index} className="text-gray-800 mb-2">
                            {ques}
                          </p>
                        ))}
                      </div>
                      <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                        Fragwürdig
                      </span>
                    </div>
                  )}
                  {islegal.length > 0 && (
                    <div className="flex justify-between items-center bg-white p-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="w-[70%]">
                        {islegal.map((leg, index) => (
                          <p key={index} className="text-gray-800 mb-2">
                            {leg}
                          </p>
                        ))}
                      </div>
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        legal
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-[100%] lg:w-[90%] mx-auto mt-8">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Eingabefeld:
                </h1>
                <p className="text-gray-600 mb-4">
                  {structuredSummary?.rental_period_costs?.rent}
                </p>
                <div className="p-4 w-full border border-gray-300 rounded-lg my-4 bg-white shadow-sm">
                  <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                    <div className="w-full lg:w-[50%] text-center lg:text-left">
                      <p className="text-gray-800 font-medium">
                        Ausgabe (nach Berechnung)
                      </p>
                    </div>
                    <span className="text-amber-600 font-bold text-lg">
                      {animatedRentScore}% {isResponse?.rent_comparison?.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full transition-all duration-[3000ms] ease-out transform origin-left"
                      style={{
                        width: `${Math.min(animatedRentScore, 100)}%`,
                        background: "linear-gradient(90deg, #f59e0b, #d97706)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      <div className="h-full w-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[100%] lg:w-[90%] mx-auto mt-8">
                <h1 className="text-gray-800 my-10 text-xl sm:text-2xl lg:text-3xl font-bold">
                  Analyse der Indexierungsklausel
                </h1>

                <div className="flex flex-wrap gap-4">

                {isResponse?.indexation_clause_analysis?.llm_generated_summary && (
                    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Ergebnis:
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {isResponse.indexation_clause_analysis.llm_generated_summary}
                      </p>
                    </div>
                  )}

                  {isResponse?.indexation_clause_analysis?.index_name && (
                    <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Indexname:
                      </h3>
                      <p className="text-gray-600">
                        {isResponse.indexation_clause_analysis.index_name}
                      </p>
                    </div>
                  )}

                  {isResponse?.indexation_clause_analysis?.threshold_percent !==
                    undefined &&
                    isResponse.indexation_clause_analysis.threshold_percent !==
                      0 && (
                      <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Schwellenprozentsatz:
                        </h3>
                        <p className="text-gray-600">
                          {
                            isResponse.indexation_clause_analysis
                              .threshold_percent
                          }
                        </p>
                      </div>
                    )}

                  {isResponse?.indexation_clause_analysis
                    ?.symmetric_adjustment !== undefined && (
                    <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Symmetrische Einstellung:
                      </h3>
                      <p className="text-gray-600">
                        {isResponse.indexation_clause_analysis
                          .symmetric_adjustment
                          ? "Ja"
                          : "Nein"}
                      </p>
                    </div>
                  )}

                  {isResponse?.indexation_clause_analysis
                    ?.adjustment_interval && (
                    <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Einstellintervall:
                      </h3>
                      <p className="text-gray-600">
                        {
                          isResponse.indexation_clause_analysis
                            .adjustment_interval
                        }
                      </p>
                    </div>
                  )}

                  {/* {isResponse?.indexation_clause_analysis?.clause_text && (
                    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Klauseltext:
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {isResponse.indexation_clause_analysis.clause_text}
                      </p>
                    </div>
                  )} */}
                </div>
              </div>

              <div className="w-[100%] lg:w-[90%] mx-auto mt-12">
                <h1 className="text-gray-800 text-xl sm:text-2xl lg:text-3xl my-10 font-bold">
                  VPI-Validierung
                </h1>

                <div className="flex flex-wrap gap-4">

                {isResponse?.vpi_validation?.llm_generated_summary && (
                    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Ergebnis:
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {isResponse.vpi_validation.llm_generated_summary}
                      </p>
                    </div>
                  )}

                  {isResponse?.vpi_validation?.comment && (
                    <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Kommentar:
                      </h3>
                      <p className="text-gray-600">
                        {isResponse.vpi_validation.comment}
                      </p>
                    </div>
                  )}

                  {isResponse?.vpi_validation?.indexation_valid !==
                    undefined && (
                    <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Indexierung gültig:
                      </h3>
                      <p className="text-gray-600">
                        {isResponse.vpi_validation.indexation_valid
                          ? "Ja"
                          : "Nein"}
                      </p>
                    </div>
                  )}

                  {isResponse?.vpi_validation?.base_year_or_start_date && (
                    <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Basisjahr oder Startdatum:
                      </h3>
                      <p className="text-gray-600">
                        {isResponse.vpi_validation.base_year_or_start_date}
                      </p>
                    </div>
                  )}

                  {isResponse?.vpi_validation?.last_adjustment_date && (
                    <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Datum der letzten Anpassung:
                      </h3>
                      <p className="text-gray-600">
                        {isResponse.vpi_validation.last_adjustment_date}
                      </p>
                    </div>
                  )}

                  {isResponse?.vpi_validation?.expected_rent !== undefined &&
                    isResponse.vpi_validation.expected_rent !== 0 && (
                      <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Voraussichtliche Miete:
                        </h3>
                        <p className="text-gray-600">
                          {isResponse.vpi_validation.expected_rent}
                        </p>
                      </div>
                    )}

                  {isResponse?.vpi_validation?.current_rent !== undefined &&
                    isResponse.vpi_validation.current_rent !== 0 && (
                      <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Aktuelle Miete:
                        </h3>
                        <p className="text-gray-600">
                          {isResponse.vpi_validation.current_rent}
                        </p>
                      </div>
                    )}

                  {isResponse?.vpi_validation?.difference_percent !==
                    undefined &&
                    isResponse.vpi_validation.difference_percent !== 0 && (
                      <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Unterschied in Prozent:
                        </h3>
                        <p className="text-gray-600">
                          {isResponse.vpi_validation.difference_percent}
                        </p>
                      </div>
                    )}

                  {isResponse?.vpi_validation?.within_tolerance !==
                    undefined && (
                    <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Innerhalb der Toleranz:
                      </h3>
                      <p className="text-gray-600">
                        {isResponse.vpi_validation.within_tolerance
                          ? "Ja"
                          : "Nein"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-[100%] lg:w-[90%] mx-auto mt-12">
                <h1 className="text-gray-800 text-xl sm:text-2xl lg:text-3xl my-10 font-bold">
                  Richtwertvalidierung
                </h1>

                <div className="flex flex-wrap gap-4">

                {isResponse?.richtwert_validation?.llm_generated_summary && (
                    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Ergebnis:
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {isResponse.richtwert_validation.llm_generated_summary}
                      </p>
                    </div>
                  )}

                  {isResponse?.richtwert_validation?.applicable !==
                    undefined && (
                    <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Anwendbar:
                      </h3>
                      <p className="text-gray-600">
                        {isResponse.richtwert_validation.applicable
                          ? "Ja"
                          : "Nein"}
                      </p>
                    </div>
                  )}

                  {isResponse?.richtwert_validation?.max_rent_allowed !==
                    undefined &&
                    isResponse.richtwert_validation.max_rent_allowed !== 0 && (
                      <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Höchstmiete erlaubt:
                        </h3>
                        <p className="text-gray-600">
                          {isResponse.richtwert_validation.max_rent_allowed}
                        </p>
                      </div>
                    )}

                  {isResponse?.richtwert_validation?.valid !== undefined && (
                    <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Gültig:
                      </h3>
                      <p className="text-gray-600">
                        {isResponse.richtwert_validation.valid ? "Ja" : "Nein"}
                      </p>
                    </div>
                  )}

                  {isResponse?.richtwert_validation?.comment && (
                    <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Kommentar:
                      </h3>
                      <p className="text-gray-600">
                        {isResponse.richtwert_validation.comment}
                      </p>
                    </div>
                  )}

                  {isResponse?.richtwert_validation?.current_rent !==
                    undefined &&
                    isResponse.richtwert_validation.current_rent !== 0 && (
                      <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Aktuelle Miete:
                        </h3>
                        <p className="text-gray-600">
                          {isResponse.richtwert_validation.current_rent}
                        </p>
                      </div>
                    )}

                  {isResponse?.richtwert_validation?.excess_amount !==
                    undefined &&
                    isResponse.richtwert_validation.excess_amount !== 0 && (
                      <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Überschussbetrag:
                        </h3>
                        <p className="text-gray-600">
                          {isResponse.richtwert_validation.excess_amount}
                        </p>
                      </div>
                    )}

                  {isResponse?.richtwert_validation?.excess_percent !==
                    undefined &&
                    isResponse.richtwert_validation.excess_percent !== 0 && (
                      <div className="flex-1 min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Überschussprozent:
                        </h3>
                        <p className="text-gray-600">
                          {isResponse.richtwert_validation.excess_percent}
                        </p>
                      </div>
                    )}
                </div>
              </div>

              <div className="w-[100%] lg:w-[90%] mx-auto mt-12">
                <h1 className="text-gray-800 text-xl sm:text-2xl lg:text-3xl my-10 font-bold">
                Detailergebnis
                </h1>

                <div className="flex flex-wrap gap-4">

                {isResponse?.summary_comment && (
                    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Zusammenfassung:
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {isResponse.summary_comment}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-[90%] lg:w-[90%] my-10 mx-auto flex flex-col lg:flex-row justify-center gap-10 items-center">
                <Button
                  className="h-[50px] w-[80%] md:w-[40%] lg:w-[30%] bg-[#186DEE] text-white border-none rounded-md outline-none hover:bg-[#1557c7] transition-colors duration-300 transform hover:scale-105"
                  text="PDF-Bericht herunterladen"
                  onclick={() => {
                    /* Add PDF download functionality */
                  }}
                />
                <Button
                  className="h-[50px] w-[80%] md:w-[40%] lg:w-[30%] border-2 border-[#186DEE] text-[#186DEE] rounded-md hover:bg-[#186DEE] hover:text-white transition-all duration-300 transform hover:scale-105"
                  text="Neue Analyse starten"
                  onclick={handleNewAnalysis}
                />
                <Button
                  className="h-[50px] w-[80%] md:w-[40%] lg:w-[30%] text-[var(--white-color)] rounded-md bg-[var(--green-color)] hover:text-white transition-all duration-300 transform hover:scale-105"
                  text="Jetzt Rechtsbeistand kontaktieren"
                  onclick={() => {
                    /* Add contact functionality */
                  }}
                />
              </div>

              <div className="w-[90%] my-10 lg:w-[90%] mx-auto">
                <p className="text-[18px] w-full lg:w-[50%] mx-auto text-[#CACBCB] text-center">
                  Dieses Tool ersetzt keine Rechtsberatung. Alle Angaben ohne
                  Gewähr.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Score;
