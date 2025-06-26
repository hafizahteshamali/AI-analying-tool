import Button from "../../../components/Button";

const ContactSection = ({ contactData }) => {
  const { heading, contactDetails } = contactData;
  return (
    <div className="w-full pt-[100px] flex lg:justify-end justify-center">
      <div className="h-[100%] w-[100%]">
        <div className="">
          <div className="px-3 flex flex-col gap-5 md:flex-row lg:flex-row lg:gap-0 justify-between items-center">
            <div className="w-[100%] md:w-[32%] lg:w-[32%]">
              <h1 className="text-3xl lg:text-5xl xl:text-6xl text-[var(--secondary-color)] font-bold">
                Nehmen wir Kontakt auf
              </h1>
            </div>

            <div className="w-[100%] md:w-[32%] lg:w-[32%]">
              <img src="./assets/images/Home/arrow.png" alt="" />
            </div>

            <div className="w-[100%] md:w-[32%] lg:w-[32%] flex justify-between items-center">
              <p className="text-[var(--secondary-color)] font-[500] text-left">
                Großartig! Wir freuen uns, von Ihnen zu hören und lassen Sie uns
                gemeinsam etwas Besonderes beginnen. Rufen Sie uns für jede
                Anfrage an
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[50px] w-full flex flex-col md:flex-row justify-center items-center">
          <div className="w-[100%] md:w-[40%] lg:w-[45%] px-3 lg:px-3 ">
            <h2 className="w-[100%] lg:w-[70%] text-[var(--secondary-color)] text-2xl lg:text-3xl font-[600]">
              {heading}
            </h2>

            {contactDetails.map((contact, index) => {
              return (
                <div key={index} className="my-5">
                  <h3 className="text-[var(--secondary-color)] font-[400]">
                    {contact.label}
                  </h3>
                  <p className="text-xl font-[500] text-[var(--secondary-color)]">
                    {contact.value}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="w-[100%] md:w-[60%] lg:w-[55%] bg-[var(--green-color)] p-3 h-[400px] flex justify-center items-center">
            <div className="h-[300px] w-[100%] lg:w-[85%] lg:p-2">
              <h1 className="text-4xl text-[var(--white-color)] font-bold">
                Kontakt
              </h1>
              <form action="">
                <div className="w-[100%] flex justify-between items-center my-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="h-[50px] w-[48%] border-b-2 border-[var(--white-color)] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="E-Mail"
                    className="h-[50px] w-[48%] border-b-2 border-[var(--white-color)] outline-none"
                  />
                </div>
                <div className="w-[100%] flex justify-between items-center my-2">
                  <input
                    type="text"
                    placeholder="Telefon"
                    className="h-[50px] w-[48%] border-b-2 border-[var(--white-color)] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Thema"
                    className="h-[50px] w-[48%] border-b-2 border-[var(--white-color)] outline-none"
                  />
                </div>
                <div className="w-[100%] flex justify-between items-center my-2">
                  <input
                    type="text"
                    placeholder="Erzählen Sie uns von Ihrem Interesse an"
                    className="h-[50px] w-[100%] border-b-2 border-[var(--white-color)] outline-none"
                  />
                </div>
                <div className="w-[100%] flex justify-end items-center mt-7">
                  <Button
                    type="submit"
                    className="h-[40px] w-[50%] sm:w-[40%] lg:w-[30%] bg-[var(--white-color)] text-[var(--secondary-color)] rounded-full"
                    text="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
