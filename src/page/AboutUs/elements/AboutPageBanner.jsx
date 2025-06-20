import Button from "../../../components/Button";
import Header from "../../../Navigation/Header";

const AboutPageBanner = ({ AboutPageBannerData, ContractSolutionData }) => {
  const { lgHeading, para, greenBtnText, loginBtnText, counters } =
    AboutPageBannerData;

  const { smHeading, heading, description } = ContractSolutionData;

  return (
    <>
      <div className="bg-[var(--primary-color)] p-4 rounded-b-4xl">
        <div className="container mx-auto">
          <Header />

          <div className="w-[100%] mx-auto flex flex-col justify-center items-center lg:items-center lg:justify-start lg:mx-auto mt-[50px] sm:w-[80%] lg:w-[100%] py-[30px]">
            <h1 className="text-3xl lg:text-5xl text-center text-[var(--secondary-color)] leading-tight font-[500] lg:w-[70%]">
              {lgHeading}
            </h1>
            <p className="w-[100%] lg:w-[50%] text-center text-[var(--secondary-color)] text-[16px] my-5">
              {para}
            </p>

            <div className="w-[100%] flex flex-col lg:flex-row justify-center items-center gap-8 p-2">
              <Button
                className="h-[50px] w-[80%] lg:w-[25%] bg-[var(--green-color)] text-[var(--white-color)] rounded text-[14px] lg:text-[18px]"
                text={greenBtnText}
              />
              <Button
                className="h-[50px] w-[80%] lg:w-[10%] bg-[var(--white-color)] text-[var(--black-color)] font-[500] rounded text-[18px]"
                text={loginBtnText}
              />
            </div>

            <div className="bg-[var(--white-color)] w-[100%] lg:w-[85%] h-[500px] md:h-[300px] lg:h-[250px] mx-auto my-[50px] rounded-2xl flex flex-wrap lg:flex-row justify-around items-center">
              {counters.map((cn, index) => {
                return (
                  <div
                    key={index}
                    className="w-[100%] md:w-[45%] lg:w-[25%] flex flex-col justify-center gap-4 items-center"
                  >
                    <h1 className="text-5xl text-left font-[400]">
                      {cn.numbers}
                    </h1>
                    <p className="text-left font-[400]">{cn.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--white-color)] my-[50px]">
        <div className="container mx-auto">
          <div className="lg:min-h-[300px] flex justify-center items-center">
            <div className="lg:min-h-[200px] w-[100%] flex flex-col lg:flex-row justify-around items-center">
              <div className="w-[100%] lg:w-[45%] h-[100%] p-4">
                <h4 className="text-2xl font-[400] text-[var(--secondary-color)]">
                  {smHeading}
                </h4>
                <h1 className="text-3xl lg:text-5xl w-[80%] leading-snug font-[500]">
                  {heading}
                </h1>
              </div>
              <div className="w-[100%] lg:w-[45%] p-4 text-[18px] font-[400]">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPageBanner;
