import Header from "../../../Navigation/Header";

const FaqsBanner = ({ FAQsBannerData }) => {
  const { heading, description, img } = FAQsBannerData;
  return (
    <div className="bg-[var(--primary-color)] p-4">
      <div className="container mx-auto">
        <Header />

        <div className="flex justify-center items-center my-[50px]">
          <div className="min-h-[500px] flex flex-col lg:flex-row justify-around items-center">
            <div className="w-[100%] lg:w-[40%]">
              <h1 className="text-4xl text-[var(--secondary-color)] font-bold">
                {heading}
              </h1>
              <p className="text-[16px] my-5 text-[var(--secondary-color)] font-[400]">
                {description}
              </p>
            </div>
            <div className="lg:w-[40%] h-[100%]">
              <img src={img} alt="" className="h-[100%] w-[100%] object-fill" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqsBanner;
