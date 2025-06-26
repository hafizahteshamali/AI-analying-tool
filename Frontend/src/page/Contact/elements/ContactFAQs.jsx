import { accordionData } from "../../../assets/constantData";
import Accordion from "../../../components/Accordion";

const ContactFAQs = ({ contactFAQsData, whiteBg }) => {
  const { lgHeading, subTitle, imgUrl } = contactFAQsData;
  return (
    <div className={whiteBg ? "bg-[var(--white-color)]" : "bg-[#D9D9D9]"}>
      <div className="container mx-auto ">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[100%] flex flex-col justify-center items-center my-[50px]">
            <h1 className="text-3xl lg:text-4xl text-[var(--secondary-color)] font-bold my-5">
              {lgHeading}
            </h1>
            <p className="text-xl text-center lg:text-left text-[var(--secondary-color)] font-[500]">
              {subTitle}
            </p>

            <div className="w-full my-[50px] flex flex-col lg:flex-row justify-around items-center p-3">
              <div className="lg:w-[45%] w-full">
                <Accordion accordionData={accordionData} contactFaqs />
              </div>

              <div className="lg:h-[550px] lg:w-[45%] w-full rounded-2xl overflow-hidden">
                    <img src={imgUrl} className="h-[100%] w-[100%] rounded-2xl object-fill" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFAQs;
