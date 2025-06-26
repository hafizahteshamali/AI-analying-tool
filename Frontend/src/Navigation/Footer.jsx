import { footerData } from "../assets/constantData";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
      <div className="px-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 min-h-[250px] ">
        
        {/* Logo Section */}
        <div className="flex justify-center lg:justify-start w-full lg:w-[30%]">
          <img
            src="./assets/images/LOGO.png"
            className="object-contain w-[150px] h-auto"
            alt="Logo"
          />
        </div>

        {/* Links Section */}
        <div className="w-full lg:w-[75%] flex flex-col sm:flex-row flex-wrap gap-6">
          {footerData.map((item, index) => {
            const { heading, bullets } = item;
            return (
              <div key={index} className="w-full sm:w-[45%] md:w-[31%] p-1 flex flex-col items-center sm:items-start">
                <h3 className="text-xl font-semibold text-white mb-4">{heading}</h3>
                <ul className="text-center sm:text-left">
                  {bullets.map((bullet, idx) => (
                    <li key={idx} className="mb-2">
                      <NavLink
                        to={bullet.textLink}
                        className="hover:underline text-gray-300 hover:text-white"
                      >
                        {bullet.linkText}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default Footer;
