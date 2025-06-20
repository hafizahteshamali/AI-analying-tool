import { accordionData } from "../../../assets/constantData";
import Accordion from "../../../components/Accordion";

const FAQs = ({ ExperienceData }) => {
  const { heading, para, inputPlaceholder, imgURl } = ExperienceData;


  return (
    <>
      <div className="bg-[#E5E7EB] p-1">
        <div className="container mx-auto my-[50px]">
          <div className="flex flex-col py-[50px] justify-center items-start lg:items-center w-[90%] mx-auto">
            <h1 className="text-4xl text-[var(--secondary-color)] font-bold">
              Häufig gestellte Fragen
            </h1>
            <p className="text-[16px] text-[var(--secondary-color)] font-semibold my-4">
              Mehr als 500+ Kunden vertrauen darauf
            </p>

            <div className="lg:w-[80%] lg:mx-auto w-full">
              <Accordion accordionData={accordionData} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--green-color)]">
        <div className="container mx-auto">
          <div className="flex justify-center items-end pt-4">
            <div className="w-full flex flex-col lg:flex-row justify-around items-center px-4">
              <div className="w-[100%] lg:w-[50%] flex flex-col justify-center items-start gap-5">
                <h1 className="text-4xl text-[var(--white-color)] font-bold">
                  {heading}
                </h1>
                <p className="text-[16px] text-[var(--white-color)] font-[400] lg:w-[70%]">
                  {para}
                </p>
                <input
                  type="email"
                  placeholder={inputPlaceholder}
                  className="h-[50px] w-[100%] sm:w-[70%] lg:w-[70%] FaQinput bg-[var(--white-color)] rounded-full p-5 border-none outline-none"
                />
              </div>

              <div className="w-[100%] lg:w-[50%] flex justify-end mt-7">
                    <img src={imgURl} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQs;
