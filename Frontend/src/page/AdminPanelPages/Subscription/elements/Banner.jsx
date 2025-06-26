import { PlansData } from "../../../../assets/constantData";
import Plans from "../../../../components/Plans";
import Header from "../../../../Navigation/Header";

const Banner = ({ subscriptionData }) => {
  const { heading, highlight, para } = subscriptionData;
  return (
    <div className="bg-[var(--white-color)]">
      <div className="container mx-auto p-4">
        <Header />

        <div className="my-[50px] flex flex-col justify-center items-center">
          <h1 className="text-5xl text-[var(--secondary-color)] font-[500]">
            {heading}{" "}
            <span className="text-[var(--black-color)]">{highlight}</span>{" "}
          </h1>
          <p className="lg:w-[35%] mx-auto text-center my-5">{para}</p>
        </div>

        <div className="w-full flex flex-wrap justify-center items-center gap-7">
          {PlansData.map((plan, index) => {
            return <Plans key={index} data={plan} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Banner;
