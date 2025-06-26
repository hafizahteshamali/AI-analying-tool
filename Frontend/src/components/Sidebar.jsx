import { NavLink } from "react-router-dom";
import { AdminRoutes } from "../assets/constantData";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect } from "react";

const Sidebar = ({ sidebarOpen, setSidebarOpen, toggleSidebar }) => {
  // Close sidebar when screen size increases beyond mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed z-30 bottom-6 right-6 bg-[var(--green-color)] text-white p-3 rounded-full shadow-lg"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#00000098] bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 bottom-0 lg:static z-20 min-h-[100vh] py-6
          w-[100%] sm:w-[280px] lg:w-[300px] 
          bg-[var(--green-color)] lg:rounded-r-2xl text-white
          transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
          transition-transform duration-300 ease-in-out
        `}
      >
        <div className="my-6 md:my-[50px]">
          <ul className="w-full flex flex-col gap-3 md:gap-5">
            {AdminRoutes.map((route, index) => (
              <li key={index}>
                <NavLink
                  to={`/admin/${route.url}`}
                  end={route.url === ""}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#029D8C] text-white px-3 py-3 md:py-4 rounded block w-[90%] pl-6 md:pl-8"
                      : "hover:underline px-3 py-2 block w-[90%] pl-6 md:pl-8"
                  }
                >
                  {route.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
