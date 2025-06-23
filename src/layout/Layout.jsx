import { Outlet, useLocation } from "react-router-dom";
import Header from "../Navigation/Header.jsx";
import PageFooter from "../Navigation/PageFooter";

const Layout = () => {
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/contact" ||
    location.pathname === "/how-it-works" ||
    location.pathname === "/about-us" ||
    location.pathname === "/faqs" ||
    location.pathname === "/admin/subscription" ||
    location.pathname === "/score";

  return (
    <>
      {!isHomePage && <Header />}
      <Outlet />
      <PageFooter />
    </>
  );
};

export default Layout;
