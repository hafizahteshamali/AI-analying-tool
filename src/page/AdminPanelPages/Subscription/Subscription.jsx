import { useEffect, useState } from "react";
import Banner from "./elements/Banner";
import { Navigate } from "react-router-dom";
import { connectTeamBannerData, contactFAQsData, contactFormDetails, subscriptionData } from "../../../assets/constantData";
import ContactSection from "./elements/ContactSection";
import ContactFAQs from "../../Contact/elements/ContactFAQs";

const Subscription = () => {
  const [userLogedIn, setUserLogedIn] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Define loading state

  useEffect(() => {
    const loginToken = sessionStorage.getItem("loginToken");
    if (loginToken) {
      setUserLogedIn(true);
    } else {
      setUserLogedIn(false);
    }
    setLoading(false); // ✅ Mark check complete
  }, []);

  // ⏳ Wait for session check to complete
  if (loading) return null;

  // 🔐 Redirect to Home if not logged in
  if (!userLogedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Banner subscriptionData={subscriptionData} />
      <ContactSection connectTeamBannerData={connectTeamBannerData} contactFormDetails={contactFormDetails} />
      <ContactFAQs contactFAQsData={contactFAQsData} whiteBg />
    </div>
  );
};

export default Subscription;
