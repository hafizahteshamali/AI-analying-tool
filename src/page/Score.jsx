import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaFile, FaFileUpload } from "react-icons/fa"
import Button from "../components/Button"
import Header from "../Navigation/Header"
import { AipostReq } from "../api/AiAnalyticsAxios"

const Score = () => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [isAllowed, setIsAllowed] = useState(false)
  const [isResponse, setIsResponse] = useState([])

  // Animation states
  const [animatedRiskScore, setAnimatedRiskScore] = useState(0)
  const [animatedRentScore, setAnimatedRentScore] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem("loginToken")

    if (token) {
      setIsAllowed(true)
    } else {
      navigate("/")
    }
  }, [])

  // Animate progress bars when data is available
  useEffect(() => {
    if (isResponse?.risk_score_percent) {
      setShowAnimation(true)

      // Animate risk score
      const riskTarget = Number.parseInt(isResponse.risk_score_percent)
      let riskCurrent = 0
      const riskIncrement = riskTarget / 50 // 50 steps for smooth animation

      const riskInterval = setInterval(() => {
        riskCurrent += riskIncrement
        if (riskCurrent >= riskTarget) {
          riskCurrent = riskTarget
          clearInterval(riskInterval)
        }
        setAnimatedRiskScore(Math.round(riskCurrent))
      }, 40) // 40ms intervals for smooth animation

      // Animate rent score (assuming 14% as shown in your code)
      const rentTarget = 14
      let rentCurrent = 0
      const rentIncrement = rentTarget / 50

      const rentInterval = setInterval(() => {
        rentCurrent += rentIncrement
        if (rentCurrent >= rentTarget) {
          rentCurrent = rentTarget
          clearInterval(rentInterval)
        }
        setAnimatedRentScore(Math.round(rentCurrent))
      }, 40)

      // Cleanup intervals
      return () => {
        clearInterval(riskInterval)
        clearInterval(rentInterval)
      }
    }
  }, [isResponse])

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    setFileName(selectedFile.name)

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await AipostReq("/upload", formData)
      console.log("✅ Upload Response:", response)
      setIsResponse(response?.data)
    } catch (error) {
      console.error("❌ Upload Error:", error)
    }
  }

  if (!isAllowed) return null

  return (
    <>
      <div className="w-full bg-[#132438] flex flex-col items-center justify-start py-10 px-4">
        <div className="container mx-auto min-h-[500px]">
          <Header />

          <div className="text-center h-[300px] my-[50px] flex flex-col justify-center items-center">
            <h1 className="text-white text-4xl font-bold">Mietvertrag KI-Analyse</h1>
            <p className="text-white text-[16px] w-[100%] lg:w-[80%] mx-auto mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis non culpa quisquam numquam suscipit
              in incidunt asperiores unde enim consectetur officia quo iste quam eaque perferendis mollitia voluptates,
              eum laborum.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <form className="mt-10 rounded-md w-[90%] lg:w-[70%] mx-auto">
          <div className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center flex flex-col justify-center items-center">
            <p className="mb-4 font-semibold text-gray-800">PDF, DOCX, JPG – max. 5 MB</p>
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
                className="cursor-pointer bg-[#0055a5] text-white h-[50px] w-[80%] lg:w-[40%] flex justify-center items-center rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Datei auswählen
              </label>
              {fileName && (
                <Button
                  type="submit"
                  className="h-[50px] w-[80%] lg:w-[40%] bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 transition-colors duration-300"
                  text="Analyse starten"
                />
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
                  <label className="text-gray-500 text-[18px]">File Upload</label>
                </>
              )}
            </div>

            <a href="#" download className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
              Download
            </a>
          </div>
        </form>

        {/* Risk Score Section */}
        <div className="w-[90%] lg:w-[70%] mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800">Ergebnisse der Analyse</h1>

          <div className="flex justify-between items-center my-4">
            <span className="text-lg font-medium">Risiko-Score</span>
            <span className="text-lg font-bold text-orange-600">{showAnimation ? animatedRiskScore : 0}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-[3000ms] ease-out transform origin-left"
              style={{
                width: showAnimation ? `${animatedRiskScore}%` : "0%",
                background:
                  animatedRiskScore > 70
                    ? "linear-gradient(90deg, #ef4444, #dc2626)"
                    : animatedRiskScore > 40
                      ? "linear-gradient(90deg, #f59e0b, #d97706)"
                      : "linear-gradient(90deg, #10b981, #059669)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              <div className="h-full w-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Contract Summary */}
        <div className="w-[90%] lg:w-[70%] mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800">Zusammenfassung der Analyse</h1>
          <p className="my-4 text-gray-700 leading-relaxed">{isResponse.contract_summary_german}</p>
        </div>

        {/* Clause Evaluation */}
        <div className="w-[90%] lg:w-[70%] mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800">Klauselbewertung</h1>

          <div className="w-[100%] my-4 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
              <div className="w-[70%]">
                <p className="text-gray-800">Mieter muss die Wände streichen</p>
              </div>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">illegal</span>
            </div>
            <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
              <div className="w-[70%]">
                <p className="text-gray-800">Mieter muss die Wände streichen</p>
              </div>
              <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                Fragwürdig
              </span>
            </div>
            <div className="flex justify-between items-center bg-white p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="w-[70%]">
                <p className="text-gray-800">Mieter muss die Wände streichen</p>
              </div>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">legal</span>
            </div>
          </div>
        </div>

        {/* Rent Comparison */}
        <div className="w-[90%] lg:w-[70%] mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800">Eingabefeld:</h1>
          <p className="text-gray-600 mb-4">Tatsächliche Monatsmiete $275</p>

          <div className="p-4 w-full border border-gray-300 rounded-lg my-4 bg-white shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
              <div className="w-full lg:w-[50%] text-center lg:text-left">
                <p className="text-gray-800 font-medium">Ausgabe (nach Berechnung)</p>
              </div>
              <span className="text-amber-600 font-bold text-lg">
                +{showAnimation ? animatedRentScore : 0}% über dem Wiener Mietspiegel
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-[3000ms] ease-out transform origin-left"
                style={{
                  width: showAnimation ? `${(animatedRentScore / 20) * 100}%` : "0%", // Assuming 20% is max
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
        <div className="w-[90%] my-10 lg:w-[90%] mx-auto flex flex-col lg:flex-row justify-center gap-10 items-center">
          <Button
            className="h-[50px] w-[80%] md:w-[40%] lg:w-[30%] bg-[#186DEE] text-white border-none rounded-md outline-none hover:bg-[#1557c7] transition-colors duration-300 transform hover:scale-105"
            text="PDF-Bericht herunterladen"
            onclick=""
          />
          <Button
            className="h-[50px] w-[80%] md:w-[40%] lg:w-[30%] border-2 border-[#186DEE] text-[#186DEE] rounded-md hover:bg-[#186DEE] hover:text-white transition-all duration-300 transform hover:scale-105"
            text="Neue Analyse starten"
            onclick=""
          />
        </div>

        <div className="w-[90%] my-10 lg:w-[90%] mx-auto">
          <p className="text-[18px] w-full lg:w-[50%] mx-auto text-[#CACBCB] text-center">
            Dieses Tool ersetzt keine Rechtsberatung. Alle Angaben ohne Gewähr.
          </p>
        </div>
      </div>
    </>
  )
}

export default Score
