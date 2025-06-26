import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";

import Home from "../page/Home/Home";
import Contact from "../page/Contact/Contact";
import HowItWorks from "../page/HowItWork/HowItWorks";
import AboutUs from "../page/AboutUs/AboutUs";
import FAQsPage from "../page/FAQsPage/FAQsPage";
import AdminLayout from "../layout/AdminLayout";
import Overview from "../page/AdminPanelPages/Overview";
import AiContractAnalysis from "../page/AdminPanelPages/AiContractAnalysis";
import TrainingArea from "../page/AdminPanelPages/TrainingArea";
import { AdminRoutes } from "../assets/constantData";
import { ToastContainer } from "react-toastify";
import Subscribers from "../page/AdminPanelPages/Subscribers";
import Subscription from "../page/AdminPanelPages/Subscription/Subscription";
import Score from "../page/Score.jsx";

const AppRoutes = () => {
  return (
    <>
      <Routes>
      {/* Main Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/score" element={<Score />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/admin/subscription" element={<Subscription />} />
      </Route>

      <Route path="/admin" element={<AdminLayout AdminRoutes={AdminRoutes} />}>
        <Route index element={<Overview />} />
        <Route path="contract-analysis" element={<AiContractAnalysis />} />
        <Route path="training-area" element={<TrainingArea />} />
        <Route path="subscribers" element={<Subscribers />} />
      </Route>
        
    </Routes>
    <ToastContainer />
    </>
  );
};

export default AppRoutes;
