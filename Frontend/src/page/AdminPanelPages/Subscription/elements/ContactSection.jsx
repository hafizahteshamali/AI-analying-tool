import { NavLink } from "react-router-dom";
import Button from "../../../../components/Button";

const ContactSection = ({connectTeamBannerData, contactFormDetails}) => {

    const { lgHeading, para } = connectTeamBannerData;
  const { heading, description, socialLinks, contactLinks } =
    contactFormDetails;

  return (
    <div className="bg-[var(--white-color)]">
        <div className="container mx-auto">

        <div className="w-[100%] mx-auto flex flex-col justify-center items-center lg:items-center lg:justify-start lg:mx-auto my-[50px] sm:w-[80%] lg:w-[100%] py-[30px]">
          <h1 className="text-3xl text-center lg:text-left text-[var(--secondary-color)] font-[700] leading-tight">
            {lgHeading}
          </h1>
          <p className="w-[100%] lg:w-[35%] text-center text-[var(--secondary-color)] text-[16px] my-5">
            {para}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-around items-center">
          <div className="w-[100%] md:w-[80%] lg:w-[45%] h-[95%] bg-[var(--secondary-color)] rounded-lg flex justify-center items-center">
            <div className="h-[90%] w-[100%] lg:w-[90%] p-5">
              <h1 className="text-3xl text-[var(--white-color)] w-[100%] lg:w-[80%]">
                Nehmen Sie Kontakt mit uns auf
              </h1>
              <form action="">
                <div className="w-[100%] flex justify-between items-center my-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="h-[50px] w-[48%] contact_form p-5 bg-[var(--white-color)] outline-none rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="E-Mail"
                    className="h-[50px] w-[48%] contact_form p-5 bg-[var(--white-color)] outline-none rounded-lg"
                  />
                </div>
                <div className="w-[100%] flex justify-between items-center my-6">
                  <input
                    type="text"
                    placeholder="Thema"
                    className="h-[50px] w-[100%] contact_form p-5 bg-[var(--white-color)] outline-none rounded-lg"
                  />
                </div>
                <div className="w-[100%] flex justify-between items-center my-2">
                  <textarea
                    placeholder="Erzählen Sie uns von Ihrem Interesse an"
                    className="min-h-[150px] max-h-[200px] w-[100%] contact_form p-5 bg-[var(--white-color)] outline-none rounded-lg"
                  ></textarea>
                </div>
                <div className="w-[100%] flex justify-start items-center mt-7">
                  <Button
                    type="submit"
                    className="h-[50px] w-[50%] sm:w-[40%] lg:w-[30%] bg-[var(--white-color)] text-[var(--secondary-color)] font-semibold rounded-lg"
                    text="Submit"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="w-[100%] md:w-[80%] lg:w-[45%] h-[95%] my-5 rounded-lg flex flex-col p-3 justify-center items-start">
            <h1 className="text-4xl text-[var(--secondary-color)] font-[500] my-4 ">
              {heading}
            </h1>
            <p className="text-[18px] font-[500] text-[var(--secondary-color)]">
              {description}
            </p>

            <div className="w-full flex flex-wrap my-5 gap-4 justify-between items-center">
              <>
                {socialLinks.map((sl, index) => {
                  return (
                    <div
                      key={index}
                      className="h-[100px] w-[100%] sm:w-[45%] lg:w-[48%] p-2 flex justify-start gap-3 items-center"
                    >
                      <div className="h-[40px] w-[40px] bg-[var(--secondary-color)] rounded flex justify-center items-center">
                        {sl.icon}
                      </div>
                      <div>
                        <p className="text-[var(--secondary-color)] text-xl lg:text-[16px] font-[500]">
                          {sl.text}
                        </p>
                        <p className="text-[var(--secondary-color)] text-[18px] lg:text-[13px] font-[500]">
                          {sl.value}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="h-[100px] w-[100%] lg:w-[48%] p-2 flex justify-start gap-3 items-center">
                  <ul className="flex justify-start gap-8 items-center w-full">
                    {contactLinks.map((cl, index) => {
                      return (
                        <li key={index} className="h-[40px] w-[40px] bg-[var(--secondary-color)] rounded-md flex justify-center items-center">
                          <NavLink to={cl.iconLink}>{cl.iconUrl}</NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            </div>
          </div>
        </div>

        </div>
    </div>
  )
}

export default ContactSection