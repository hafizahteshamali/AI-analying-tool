import { ExperienceData, FAQsBannerData } from "../../assets/constantData"
import FAQs from "./elements/FAQs"
import FaqsBanner from "./elements/FaqsBanner"

const FAQsPage = () => {
  return (
    <>
        <FaqsBanner FAQsBannerData={FAQsBannerData} />
        <FAQs ExperienceData={ExperienceData} />
    </>
  )
}

export default FAQsPage