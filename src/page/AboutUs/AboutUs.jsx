import { AboutPageBannerData, contactFAQsData, ContractSolutionData, HowsWorkData, PrivacyAndSecurityData } from "../../assets/constantData"
import AboutPageBanner from "./elements/AboutPageBanner"
import HowsWork from "./elements/HowsWork"
import PrivacyAndSecurity from "./elements/PrivacyAndSecurity"

const AboutUs = () => {
  return (
    <>
     <AboutPageBanner AboutPageBannerData={AboutPageBannerData} ContractSolutionData={ContractSolutionData} />  
     <HowsWork HowsWorkData={HowsWorkData} /> 
     <PrivacyAndSecurity PrivacyAndSecurityData={PrivacyAndSecurityData} contactFAQsData={contactFAQsData} />
    </>
  )
}

export default AboutUs