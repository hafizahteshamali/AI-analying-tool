import { FaFileUpload } from "react-icons/fa";
import { BiBrain } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi";

const HowsWork = ({ HowsWorkData }) => {
  const { smHeading, heading, para } = HowsWorkData;
  return (
    <div className="bg-[var(--primary-color)] mb-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 lg:p-6 rounded-lg">
          {/* Left Text Section */}
          <div className="w-full lg:w-[45%] p-6 rounded-lg text-start">
            <h4 className="text-xl lg:text-2xl text-[var(--secondary-color)] font-medium mb-4">
              {smHeading}
            </h4>
            <h1 className="text-3xl lg:text-5xl text-[var(--secondary-color)] font-bold mb-4">
              {heading}
            </h1>
            <p className="text-base lg:text-lg text-[var(--secondary-color)] leading-7">
              {para}
            </p>
          </div>

          {/* Right Timeline Section */}
          <div className="w-full lg:w-[55%] p-6 rounded-lg ">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute right-[50%] left-[7%] sm:left-[5%] lg:left-[7%] xl:left-[5%] sm:right-6 top-10 bottom-16 bg-[var(--white-color)] w-1"></div>

              {/* Step 1 */}
              <div className="flex items-start mb-12 relative">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded bg-[var(--white-color)] flex items-center justify-center z-10">
                  {/* <FaFileUpload className="text-[var(--secondary-color)] text-xl sm:text-2xl" /> */}
                  <img
                    src="./assets/images/Home/encrypt-icon.png"
                    className="h-[50px] w-[40px] object-contain"
                    alt=""
                  />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-[500] text-[var(--secondary-color)]">
                    Vertrag hochladen – Sicher und verschlüsselt.
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-[var(--secondary-color)]">
                    Laden Sie Ihren Vertrag unkompliziert per Drag & Drop oder
                    Dateiauswahl hoch. Während des Uploads wird Ihre Datei mit
                    modernster Verschlüsselung geschützt, sodass Ihre Daten
                    jederzeit sicher und vertraulich bleiben.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start mb-12 relative">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded bg-[var(--white-color)] flex items-center justify-center z-10">
                  {/* <FaFileUpload className="text-[var(--secondary-color)] text-xl sm:text-2xl" /> */}
                  <img
                    src="./assets/images/Home/ai-icon.png"
                    className="h-[50px] w-[40px] object-contain"
                    alt=""
                  />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-[500] text-[var(--secondary-color)]">
                    KI-Analyse – Automatische Prüfung relevanter Klauseln.
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-[var(--secondary-color)]">
                    Unsere fortschrittliche KI scannt Ihren Vertrag in Sekunden
                    und identifiziert automatisch alle wichtigen Klauseln, um
                    potenzielle Risiken präzise aufzudecken.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start relative">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded mt-2 bg-[var(--white-color)] flex items-center justify-center z-10">
                  {/* <FaFileUpload className="text-[var(--secondary-color)] text-xl sm:text-2xl" /> */}
                  <img
                    src="./assets/images/Home/analyses-icon.png"
                    className="h-[50px] w-[40px] object-contain"
                    alt=""
                  />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-[500] text-[var(--secondary-color)]">
                    Ergebnis erhalten – Detaillierte Analyse und Empfehlungen.
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-[var(--secondary-color)]">
                    Erhalten Sie in kürzester Zeit einen detaillierten Bericht,
                    der Ihre Vertragsklauseln präzise analysiert und Ihnen
                    klare, umsetzbare Empfehlungen für die nächsten Schritte
                    liefert.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowsWork;
