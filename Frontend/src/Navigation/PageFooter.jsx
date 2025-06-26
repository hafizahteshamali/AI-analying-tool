import { NavLink } from "react-router-dom";
import { FooterData, socialIcons } from "../assets/constantData";
import Button from "../components/Button";

const PageFooter = () => {
  return (
    <div className="bg-[#1F2324] py-10">
      <div className="container mx-auto">
        <div className="min-h-[300px] flex justify-center flex-col items-start">
          <div className="w-[100%] flex flex-wrap p-2 lg:flex-row justify-between items-center">
            <>
              {FooterData.map((item, index) => {
                const { bullets } = item;
                return (
                  <ul
                    key={index}
                    className="w-[100%] md:w-[45%] lg:w-[25%] p-3 flex flex-col items-start gap-4"
                  >
                    {bullets.map((item, index) => {
                      return (
                        <li key={index}>
                          <NavLink
                            className="text-[#D9D9D9]"
                            to={item.textLink}
                          >
                            {item.linkText}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}

              <div className="w-[100%] lg:w-[40%] md:my-3 p-3 flex flex-col items-start gap-4">
                <h2 className="text-2xl text-[var(--white-color)] ">
                  Holen Sie sich das neueste Update
                </h2>
                <input
                  type="text"
                  placeholder="Email"
                  className="h-[50px] w-[90%] md:w-[60%] lg:w-[90%] input bg-[var(--white-color)] rounded-full px-5 border-none outline-none"
                />
                <Button
                  type="submit"
                  className="h-[50px] w-[60%] md:w-[30%] lg:w-[40%] bg-[var(--secondary-color)] text-[var(--white-color)] rounded-full"
                  text="Submit"
                />
              </div>
            </>
          </div>

          <div className="w-[100%] m-auto px-5 py-3">
            <ul className="flex items-center gap-5">
              {socialIcons.map((item, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      className="h-[40px] w-[40px] border-2 border-[var(--white-color)] rounded-md flex justify-center items-center"
                      to={item.url}
                    >
                      {item.icon}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFooter;
