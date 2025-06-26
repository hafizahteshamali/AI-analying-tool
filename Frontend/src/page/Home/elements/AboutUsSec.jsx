const AboutUsSec = ({ AboutSecData, howItWorkObject, howItWorkBullets }) => {
  const { heading, description, imgUrl } = AboutSecData;
  const { img, head, para } = howItWorkObject;
  return (
    <div className="w-full bg-[var(--primary-color)]">
      <div className="container mx-auto p-1">
        <div className="my-[50px] flex flex-col justify-between lg:flex-row lg:items-start lg:h-[500px] lg:w-[95%] lg:mx-auto">
          <div className="w-[100%] flex flex-col justify-center items-start lg:w-[50%] p-4">
            <h1 className="text-6xl font-bold text-[var(--secondary-color)] mb-2">
              {heading}
            </h1>
            <p className="text-[var(--secondary-color)] font-[400] text-left text-[16px]">
              {description}
            </p>
          </div>
          <div className="h-[100%] w-[90%] mx-auto sm:w-[70%] md:w-[70%] lg:w-[45%] my-5 lg:mx-0 lg:my-0">
            <img
              src={imgUrl}
              alt=""
              className="w-[100%] h-[100%] object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="my-[50px] lg:mt-[100px] lg:flex lg:justify-between lg:items-start">
          {/* TEXT CONTENT: order-1 on mobile, order-2 on large screens */}
          <div className="w-[90%] md:w-[70%] lg:w-[50%] mx-auto my-4 order-1 lg:order-2">
            <h1 className="text-3xl text-[var(--secondary-color)] font-bold lg:text-7xl">
              {head}
            </h1>
            <p className="text-[var(--secondary-color)] my-3">{para}</p>

            {howItWorkBullets.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-start lg:flex-row lg:gap-5 my-4"
              >
                <img
                  src={item.image}
                  className="h-[50px] object-contain"
                  alt=""
                />
                <div className="my-4">
                  <h2 className="text-xl text-[var(--secondary-color)] font-[500]">
                    {item.smHeading}
                  </h2>
                  <p className="text-[var(--secondary-color)] text-[16px] my-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* IMAGE: order-2 on mobile, order-1 on large screens */}
          <div className="lg:h-[500px] w-[90%] md:w-[70%] lg:w-[40%] mx-auto rounded-2xl overflow-hidden order-2 lg:order-1">
            <img src={img} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSec;
