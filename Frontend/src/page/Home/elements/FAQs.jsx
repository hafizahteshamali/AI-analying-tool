import React from "react";
import Slider from "react-slick";
import Accordion from "../../../components/Accordion";
import { accordionData } from "../../../assets/constantData";

const FAQs = ({ itxSolutionImg }) => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000, // 👈 3 seconds between slides
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[#E5E7EB] w-full">
      <div className="w-full bg-[var(--green-color)]">
        <div className="container mx-auto px-4">
          <div className="bg-[var(--green-color)]">
          <Slider {...settings}>
            {itxSolutionImg.map((img, index) => (
              <div key={index} className="px-2">
                <img
                  src={img}
                  alt={`slide-${index}`}
                  className="w-full h-[200px] object-contain max-h-64 mx-auto"
                />
              </div>
            ))}
          </Slider>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col py-[50px] justify-center items-start lg:items-center w-[90%] mx-auto">
          <h1 className="text-3xl lg:text-4xl text-[var(--secondary-color)] font-bold">
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
  );
};

export default FAQs;
