"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { FaFile, FaFileUpload, FaPaw, FaUserCircle } from "react-icons/fa"
import Button from "../components/Button"
import Header from "../Navigation/Header"
import { AipostReq } from "../api/AiAnalyticsAxios"
import { IoCalendarNumberOutline, IoLocationOutline, IoSettingsOutline } from "react-icons/io5"
import { PiBedBold } from "react-icons/pi"
import { MdEuro } from "react-icons/md"
import { SlArrowRightCircle } from "react-icons/sl"
import { FiFileText } from "react-icons/fi"

const Score = () => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [isAllowed, setIsAllowed] = useState(false)
  const [isResponse, setIsResponse] = useState(null)
  const [isIllegal, setIsIllegal] = useState([])
  const [isQuestionable, setIsQuestionable] = useState([])
  const [islegal, setIslegal] = useState([])

  // Animation states
  const [animatedRiskScore, setAnimatedRiskScore] = useState(0)
  const [animatedRentScore, setAnimatedRentScore] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)

  const navigate = useNavigate()

  // Check authentication
  useEffect(() => {
    const token = sessionStorage.getItem("loginToken")
    if (token) {
      setIsAllowed(true)
    } else {
      navigate("/")
    }
  }, [navigate])

  // Fixed Animation effect with better debugging
  useEffect(() => {
    if (isResponse?.risk_score_percentage && !showAnimation) {
      setShowAnimation(true)

      // Parse the risk score properly
      const riskTarget = Number.parseInt(isResponse.risk_score_percentage, 10) || 0
      const rentTarget = 14

      // Reset scores before animation
      setAnimatedRiskScore(0)
      setAnimatedRentScore(0)

      // Use setTimeout to ensure state updates are processed
      setTimeout(() => {
        let riskCurrent = 0
        let rentCurrent = 0
        const duration = 2000 // 2 seconds
        const steps = 50
        const riskIncrement = riskTarget / steps
        const rentIncrement = rentTarget / steps
        const stepDuration = duration / steps

        const riskInterval = setInterval(() => {
          riskCurrent += riskIncrement
          if (riskCurrent >= riskTarget) {
            riskCurrent = riskTarget
            clearInterval(riskInterval)
          }
          setAnimatedRiskScore(Math.round(riskCurrent))
        }, stepDuration)

        const rentInterval = setInterval(() => {
          rentCurrent += rentIncrement
          if (rentCurrent >= rentTarget) {
            rentCurrent = rentTarget
            clearInterval(rentInterval)
          }
          setAnimatedRentScore(Math.round(rentCurrent))
        }, stepDuration)

        // Cleanup function
        return () => {
          clearInterval(riskInterval)
          clearInterval(rentInterval)
        }
      }, 100)
    }
  }, [isResponse, showAnimation])

  // Handle file selection
  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("Datei ist zu groß. Maximum 5MB erlaubt.")
        return
      }

      // Validate file type
      const allowedTypes = [".pdf", ".docx", ".txt"]
      const fileExtension = "." + selectedFile.name.split(".").pop().toLowerCase()
      if (!allowedTypes.includes(fileExtension)) {
        alert("Ungültiger Dateityp. Nur PDF, DOCX und TXT sind erlaubt.")
        return
      }

      setFile(selectedFile)
      setFileName(selectedFile.name)
    }
  }, [])

  // Handle file upload with better debugging
  const handleUpload = useCallback(
    async (e) => {
      e.preventDefault()
      if (!file) {
        alert("Bitte wählen Sie eine Datei aus.")
        return
      }

      const formData = new FormData()
      formData.append("file", file)

      try {
        setUploading(true)
        const response = await AipostReq("/analyze", formData)
        console.log("✅ Upload Response:", response)

        // Safely access nested properties
        const clauses = response?.data?.clauses_german || {}
        setIsIllegal(clauses.illegal || [])
        setIsQuestionable(clauses.questionable || [])
        setIslegal(clauses.legal || [])

        // Set response data
        const responseData = response?.data || null

        setIsResponse(responseData)

        // Reset animation state to trigger new animation
        setShowAnimation(false)
      } catch (error) {
        console.error("❌ Upload Error:", error)
        alert("Fehler beim Hochladen der Datei. Bitte versuchen Sie es erneut.")
      } finally {
        setUploading(false)
      }
    },
    [file],
  )

  // Reset form
  const handleNewAnalysis = useCallback(() => {
    setFile(null)
    setFileName("")
    setIsResponse(null)
    setIsIllegal([])
    setIsQuestionable([])
    setIslegal([])
    setAnimatedRiskScore(0)
    setAnimatedRentScore(0)
    setShowAnimation(false)
  }, [])

  // Test button to simulate data (for debugging)
  const handleTestAnimation = useCallback(() => {
    const mockResponse = {
      risk_score_percentage: "75",
      structured_summary_json: {
        parties: {
          landlord: "Test Landlord",
          tenant: "Test Tenant",
        },
      },
    }
    setIsResponse(mockResponse)
    setShowAnimation(false)
  }, [])

  // Memoized values
  const structuredSummary = useMemo(() => {
    return isResponse?.structured_summary_json || {}
  }, [isResponse])

  const riskScoreColor = useMemo(() => {
    if (animatedRiskScore > 70) {
      return "linear-gradient(90deg, #ef4444, #dc2626)"
    } else if (animatedRiskScore > 40) {
      return "linear-gradient(90deg, #f59e0b, #d97706)"
    }
    return "linear-gradient(90deg, #10b981, #059669)"
  }, [animatedRiskScore])

  // Don't render if not authenticated
  if (!isAllowed) return null

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-[#132438] flex flex-col items-center justify-start py-10 px-4">
        <div className="container mx-auto min-h-[500px]">
          <Header />
          <div className="text-center h-[300px] my-[50px] flex flex-col justify-center items-center">
            <h1 className="text-white text-4xl font-bold">Mietvertrag KI-Analyse</h1>
            <p className="text-white text-[16px] w-[100%] lg:w-[80%] mx-auto mt-4">
              Unsere Lösung liest und versteht Mietverträge automatisch, erkennt kritische Klauseln im Kontext aktueller
              OGH-Urteile und Gesetzeslagen, vergleicht die Miete mit dem aktuellen Index und zeigt Risiken klar
              verständlich an – Nutzer:innen können auf Knopfdruck einen vollständigen Prüfbericht erstellen oder direkt
              rechtliche Unterstützung anfordern
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-5">
        {/* File Upload Form */}
        <form className="mt-10 rounded-md w-[100%] lg:w-[90%] mx-auto" onSubmit={handleUpload}>
          <div className="border-2 border-dashed border-gray-400 min-h-[300px] p-6 rounded-lg text-center flex flex-col justify-center items-center">
            <p className="mb-4 font-semibold text-gray-800">PDF, DOCX, TXT – max. 5 MB</p>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
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
                    uploading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
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

          {/* File Display */}
          <div className="flex justify-between items-center gap-2 w-[100%] mt-8">
            <div className="w-[50%] flex justify-start items-center gap-2.5">
              {fileName ? (
                <>
                  <FaFile className="text-7xl text-gray-500" />
                  <label className="break-all">{fileName.length > 20 ? `${fileName.slice(0, 20)}...` : fileName}</label>
                </>
              ) : (
                <>
                  <FaFileUpload className="text-7xl text-gray-500" />
                  <label className="text-gray-500 text-[18px]">File Upload</label>
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

        {/* Analysis Results */}
        {isResponse && (
          <div>
            {/* Contract Summary */}
            <div className="w-[100%] lg:w-[90%] mx-auto mt-8">
              <h1 className="text-2xl lg:text-4xl my-3 font-semibold text-[var(--black-color)]">
                Zusammenfassung der Analyse
              </h1>

              {/* Contract Overview */}
              <div className="my-5">
                <h1 className="text-2xl font-[500] text-[var(--black-color)]">Vertragsübersicht</h1>
                <div className="flex flex-col lg:flex-row justify-start items-center lg:gap-5">
                  {structuredSummary?.parties?.landlord && (
                    <div className="w-[100%] lg:w-[30%] flex rounded-md my-5 justify-start items-center gap-4 p-2 border border-gray-300">
                      <div className="h-full flex justify-center items-center">
                        <FaUserCircle className="text-4xl text-[var(--black-color)]" />
                      </div>
                      <div>
                        <h1 className="text-[20px] font-[500]">{structuredSummary.parties.landlord}</h1>
                      </div>
                    </div>
                  )}
                  {structuredSummary?.parties?.tenant && (
                    <div className="w-[100%] lg:w-[30%] flex rounded-md my-5 justify-start items-center gap-4 p-2 border border-gray-300">
                      <div className="h-full flex justify-center items-center">
                        <FaUserCircle className="text-4xl text-[var(--black-color)]" />
                      </div>
                      <div>
                        <h1 className="text-[20px] font-[500]">{structuredSummary.parties.tenant}</h1>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Property Information */}
              <div className="flex flex-col justify-between items-start mb-5">
                {structuredSummary?.residential_property && (
                  <div className="w-[100%] lg:w-auto">
                    <h2 className="text-2xl font-[500] text-[var(--black-color)] my-4">Wohnobjekt</h2>
                    <div className="border border-gray-300 rounded-lg py-5 px-10 flex flex-col gap-5">
                      {structuredSummary.residential_property.address && (
                        <div className="w-[100%] flex justify-start gap-3 items-center pb-4 border-b-2 border-gray-300">
                          <div>
                            <IoLocationOutline className="text-4xl text-[var(--black-color)]" />
                          </div>
                          <div>
                            <p className="font-[500]">{structuredSummary.residential_property.address}</p>
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
                              <p className="font-[500]">{structuredSummary.residential_property.rooms}</p>
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
                            <p className="font-[500]">{structuredSummary.residential_property.size}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Rental Period & Costs */}
                {structuredSummary?.rental_period_costs && (
                  <div className="w-[100%] lg:w-[57%] mt-5">
                    <h2 className="text-2xl font-[500] text-[var(--black-color)] my-4">Mietzeit & Kosten</h2>
                    <div className="border border-gray-300 rounded-lg py-5 px-10 flex flex-col gap-5">
                      <div className="w-[100%] flex justify-start gap-3 items-center pb-4 border-b-2 border-gray-300">
                        <div className="w-full flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div>
                              <IoCalendarNumberOutline className="text-4xl text-[var(--black-color)]" />
                            </div>
                            {structuredSummary.rental_period_costs.start_date && (
                              <div>
                                <p className="font-[500]">{structuredSummary.rental_period_costs.start_date}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        {structuredSummary.rental_period_costs.duration && (
                          <span className="bg-[#EFEFEF] rounded-full flex text-center justify-center text-[12px] items-center px-2 py-1 font-[500]">
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
                              <p className="font-[500]">{structuredSummary.rental_period_costs.rent}</p>
                            </div>
                          </div>
                        )}
                        {structuredSummary.rental_period_costs.deposit && (
                          <div className="flex justify-center items-center gap-4 bg-[var(--green-color)] py-1 rounded-md px-2 lg:w-[30%] lg:px-0 my-3 lg:my-0 text-[var(--white-color)]">
                            <img
                              src="/assets/images/Admin/cash.png"
                              className="h-[40px] w-[40px] object-contain"
                              alt="Cash icon"
                            />
                            <p className="font-[500]">{structuredSummary.rental_period_costs.deposit}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Regulations Section */}
              <div className="lg:h-[600px] w-full bg-[var(--green-color)] my-[50px] rounded-4xl flex justify-center items-center">
                <div className="lg:h-[430px] w-[95%] flex flex-col gap-7 lg:gap-0 p-5 lg:p-0 lg:flex-row justify-between items-center">
                  <div className="h-[100%] w-[100%] lg:w-[32%] lg:border-r lg:border-[#288C81] flex flex-col justify-start items-start gap-5">
                    <h1 className="text-2xl text-[var(--white-color)]">Regelungen</h1>
                    <div className="min-h-[180px] w-[95%] bg-[#288C81] rounded-lg flex justify-center items-center">
                      <div className="w-[90%] flex justify-center items-center gap-5">
                        <FaPaw className="text-6xl text-[var(--white-color)]" />
                        <div>
                          <h2 className="text-xl text-[var(--white-color)]">Kleintiere erlaubt</h2>
                          <p className="mt-3 text-[var(--white-color)] font-[200]">Hunde/Katzen nur mit Zustimmung</p>
                        </div>
                      </div>
                    </div>
                    <div className="min-h-[180px] w-[95%] bg-[#288C81] rounded-lg flex justify-center items-center">
                      <div className="w-[90%] flex justify-center items-center gap-5">
                        <img src="/assets/images/Admin/house2.svg" alt="House icon" />
                        <div>
                          <h2 className="text-xl text-[var(--white-color)]">Nur zu Wohnzwecken</h2>
                          <p className="mt-3 text-[var(--white-color)] font-[200]">Ruhezeiten:</p>
                          <p className="text-[var(--white-color)] font-[200]">22:00-06:00 Uhr</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[100%] w-[100%] lg:w-[32%] lg:border-r lg:border-[#288C81] flex flex-col justify-start items-start gap-5">
                    <h1 className="text-2xl text-[var(--white-color)]">Rückgabe & Schriftform</h1>
                    <div className="min-h-[180px] w-[95%] bg-[#288C81] rounded-lg flex justify-center items-center">
                      <div className="w-[90%] flex justify-center items-center gap-5">
                        <SlArrowRightCircle className="text-6xl text-[var(--white-color)]" />
                        <div>
                          <p className="text-[var(--white-color)] font-[200]">
                            Bei Beendigung in vertragsgemäßem Zustand
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="min-h-[180px] w-[95%] bg-[#288C81] rounded-lg flex justify-center items-center">
                      <div className="w-[90%] flex justify-center items-center gap-5">
                        <FiFileText className="text-6xl text-[var(--white-color)]" />
                        <div>
                          <p className="text-[var(--white-color)] font-[200]">
                            Alle Änderungen des Vertrages in Schriftform
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[100%] w-[100%] lg:w-[32%] flex flex-col justify-start items-start gap-5">
                    <h1 className="text-2xl text-[var(--white-color)]">Pflichten</h1>
                    <div className="min-h-[180px] w-[95%] bg-[#288C81] rounded-lg flex justify-center items-center">
                      <div className="w-[90%] flex justify-center items-center gap-5">
                        <IoSettingsOutline className="text-6xl text-[var(--white-color)]" />
                        <div>
                          <h2 className="text-xl text-[var(--white-color)]">Instandhaltung und Reparaturen</h2>
                          <p className="mt-3 text-[var(--white-color)] font-[200]">bis EUR 100 der Mieter</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Score Section */}
              <div className="w-[100%] lg:w-[90%] mx-auto mt-8">
                <h1 className="text-2xl lg:text-4xl font-semibold text-gray-800">Ergebnisse der Analyse</h1>
                <div className="flex justify-between items-center my-4">
                  <span className="text-lg font-medium">Risiko-Score</span>
                  <span className="text-lg font-bold text-orange-600">{animatedRiskScore}%</span>
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

              {/* Clause Evaluation */}
              <div className="w-[100%] lg:w-[90%] mx-auto mt-8">
                <h1 className="text-2xl font-semibold text-gray-800">Klauselbewertung</h1>
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

              {/* Rent Comparison */}
              <div className="w-[100%] lg:w-[90%] mx-auto mt-8">
                <h1 className="text-2xl font-semibold text-gray-800">Eingabefeld:</h1>
                <p className="text-gray-600 mb-4">Tatsächliche Monatsmiete $275</p>
                <div className="p-4 w-full border border-gray-300 rounded-lg my-4 bg-white shadow-sm">
                  <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                    <div className="w-full lg:w-[50%] text-center lg:text-left">
                      <p className="text-gray-800 font-medium">Ausgabe (nach Berechnung)</p>
                    </div>
                    <span className="text-amber-600 font-bold text-lg">
                      +{animatedRentScore}% über dem Wiener Mietspiegel
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full transition-all duration-[3000ms] ease-out transform origin-left"
                      style={{
                        width: `${Math.min((animatedRentScore / 20) * 100, 100)}%`,
                        background: "linear-gradient(90deg, #f59e0b, #d97706)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      <div className="h-full w-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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
                  Dieses Tool ersetzt keine Rechtsberatung. Alle Angaben ohne Gewähr.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Score
