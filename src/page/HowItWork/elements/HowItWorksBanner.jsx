import UploadRentalComp from "../../../components/UploadRentalComp";
import Header from "../../../Navigation/Header";

const HowItWorksBanner = ({ howItWorksPageData }) => {
  const { lgHeading, para } = howItWorksPageData;
  return (
    <div className="bg-[var(--white-color)] p-4">
      <div className="container mx-auto">
        <Header />

        <div className="w-[100%] mx-auto flex flex-col justify-center items-center lg:items-center lg:justify-start lg:mx-auto my-[50px] sm:w-[80%] lg:w-[100%] py-[30px]">
          <h1 className="lg:w-[80%] lg:mx-auto text-3xl lg:text-5xl text-center text-[var(--secondary-color)] font-[700] leading-tight">
            {lgHeading}
          </h1>
          <p className="w-[100%] lg:w-[50%] text-center text-[var(--secondary-color)] text-[16px] my-5">
            {para}
          </p>
          <UploadRentalComp />
        </div>
      </div>
    </div>
  );
};

export default HowItWorksBanner;
