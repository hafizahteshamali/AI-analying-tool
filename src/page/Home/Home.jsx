import { AboutSecData, bannerData, contactData, howItWorkBullets, howItWorkObject, howItWorksData, itxSolutionImg, uploadRentalData } from "../../assets/constantData.jsx"
import AboutUsSec from "./elements/AboutUsSec.jsx"
import Banner from "./elements/banner"
import ContactSection from "./elements/ContactSection.jsx"
import FAQs from "./elements/FAQs.jsx"
import HowItWorks from "./elements/HowItWorks.jsx"
import UploadRental from "./elements/UploadRental.jsx"

const Home = () => {
  return (
    <>
      <Banner bannerData={bannerData} />
      <HowItWorks howItWorksData={howItWorksData} />
      <UploadRental uploadRentalData={uploadRentalData} />
      <AboutUsSec AboutSecData={AboutSecData} howItWorkObject={howItWorkObject} howItWorkBullets={howItWorkBullets} />
      <FAQs itxSolutionImg={itxSolutionImg} /> 
      <ContactSection contactData={contactData} />
    </>
  )
}

export default Home