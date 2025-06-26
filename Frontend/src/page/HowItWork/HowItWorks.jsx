import { contactData, howItWorksDetails, howItWorksPageData } from "../../assets/constantData"
import ContactSection from "../Home/elements/ContactSection"
import AnalyzeContract from "./elements/AnalyzeContract"
import FAQs from "./elements/FAQs"
import HowItWorksBanner from "./elements/HowItWorksBanner"

const HowItWorks = () => {
  return (
    <>
        <HowItWorksBanner howItWorksPageData={howItWorksPageData} />
        <AnalyzeContract howItWorksDetails={howItWorksDetails} />
        <FAQs />
        <ContactSection contactData={contactData} />
    </>
  )
}

export default HowItWorks