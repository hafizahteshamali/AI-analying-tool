import {
  connectTeamBannerData,
  contactFAQsData,
  contactFormDetails,
} from "../../assets/constantData";
import ConnectTeamBanner from "./elements/ConnectTeamBanner";
import ContactFAQs from "./elements/ContactFAQs";

const Contact = () => {
  return (
    <>
      <ConnectTeamBanner
        connectTeamBannerData={connectTeamBannerData}
        contactFormDetails={contactFormDetails}
      />
      <ContactFAQs contactFAQsData={contactFAQsData} />
    </>
  );
};

export default Contact;
