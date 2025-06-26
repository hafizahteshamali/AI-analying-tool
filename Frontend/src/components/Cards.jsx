const Cards = ({ data }) => {
  const { imgUrl, heading, para } = data;

  return (
    <div className="w-[100%] min-h-[450px] md:w-[70%] lg:w-[48%] flex flex-col justify-center xl:w-[31%] mx-auto p-4 bg-[#E5E7EB] rounded-2xl hover:bg-[var(--secondary-color)] group transition-all duration-300">
      <img
        src={imgUrl}
        alt=""
        className="h-[80px] w-[100px] object-contain group-hover:invert group-hover:brightness-100 transition-all duration-300"
      />

      <h1 className="text-[16px] text-[var(--secondary-color)] mt-7 mb-5 font-semibold group-hover:text-white transition-colors duration-300">
        {heading}
      </h1>
      <p className="text-[16px] text-[var(--secondary-color)] font-[600] group-hover:text-white transition-colors duration-300">
        {para}
      </p>
    </div>
  );
};

export default Cards;
