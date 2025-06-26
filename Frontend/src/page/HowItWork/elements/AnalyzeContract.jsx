import { howWorksCardsData } from "../../../assets/constantData";
import Cards from "../../../components/Cards";

const AnalyzeContract = ({ howItWorksDetails }) => {
  const { smHeading, lgHeading, description } = howItWorksDetails;

  return (
    <>
      <div className="bg-[var(--green-color)]">
        <div className="container mx-auto">
          <div className=" min-h-[300px] flex justify-center items-center">
            <div className="flex justify-center items-center w-[90%] lg:w-[70%] mx-auto">
              <h1 className="lg:text-4xl text-xl text-[var(--white-color)] font-bold text-center leading-11 lg:leading-relaxed">
                Analysieren Sie Ihren Vertrag in Sekundenschnelle mit{" "}
                <span className="bg-[var(--secondary-color)] rounded-full p-2 px-7 block lg:inline-block">
                  beispielloser Präzision
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-[100px]">
        <div className="flex justify-center items-center h-[400px] lg:h-[300px] ">
          <div className="lg:h-[300px] w-[90%] md:w-[60%] lg:w-[100%] items-center flex flex-col justify-between gap-6 lg:gap-0 lg:flex-row">
            <div className="w-[100%] lg:w-[50%]  flex flex-col justify-center items-start">
              <h5 className="text-[12px] text-[var(--secondary-color)] font-semibold">
                {smHeading}
              </h5>
              <h1 className="text-4xl lg:text-6xl text-[var(--secondary-color)] font-bold">
                {lgHeading}
              </h1>
            </div>

            <div className="w-[100%] lg:w-[50%] flex flex-col justify-center items-start">
              <p className="text-[var(--secondary-color)] text-[16px] font-[400]">
                {description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {howWorksCardsData.map((item, index) => {
            return <Cards key={index} data={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default AnalyzeContract;
