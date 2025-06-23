import React, { cloneElement } from "react";
import Button from "./Button";
import { FaRegCheckCircle } from "react-icons/fa";

const Plans = ({ data }) => {
  const { pkgName, para, symbol, amount, user, popular, bullets, btnText } = data;

  // Conditional Classes
  const cardBg = popular ? "bg-[var(--secondary-color)]" : "bg-transparent";
  const textColor = popular ? "text-white" : "text-[var(--black-color)]";
  const cardHeight = popular ? "min-h-[500px]" : "min-h-[450px]";
  const borderColor = "border-2 border-[var(--primary-color)]";

  return (
    <div
      className={`${cardHeight} w-full sm:w-[70%] md:w-[48%] lg:w-[31%] md:mx-0 ${borderColor} ${cardBg} relative rounded-2xl flex flex-wrap justify-center items-center my-4`}
    >
      <div className={`w-[95%] flex flex-col justify-center items-center ${textColor}`}>
        <h1 className="text-2xl font-[500]">{pkgName}</h1>
        <p className="text-center my-2 font-[400] text-[12px]">{para}</p>

        <h1 className="my-3">
          <sup className="text-2xl">{symbol}</sup>
          <span className="text-3xl font-[500]">{amount}</span>
          <sub className="text-2xl">{user}</sub>
        </h1>

        {popular && (
          <p className="bg-[var(--white-color)] text-[12px] border-2 border-[var(--primary-color)] text-[var(--black-color)] absolute top-5 right-10 w-[30%] rounded-full flex justify-center items-center">
            beliebt
          </p>
        )}

        <ul className="flex flex-col justify-center gap-3 my-2">
          {bullets.map((item, index) => {
            const isCheckIcon = item.bulletIcon.type === FaRegCheckCircle;
            return (
              <li
                key={index}
                className={`flex justify-start text-[12px] items-center gap-2 ${textColor}`}
              >
                {cloneElement(item.bulletIcon, {
                  className: `${
                    isCheckIcon
                      ? popular
                        ? "text-white"
                        : "text-[var(--secondary-color)]"
                      : "text-[#E00000]"
                  } transition-all duration-300`,
                })}
                <span>{item.text}</span>
              </li>
            );
          })}
        </ul>

        <Button
          className={`w-[70%] py-2.5 rounded-lg ${
            popular
              ? "bg-white text-[var(--secondary-color)]"
              : "bg-[var(--secondary-color)] text-white"
          } text-xl mt-3`}
          text={btnText}
        />
      </div>
    </div>
  );
};

export default Plans;
