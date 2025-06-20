import { Outlet, NavLink, Navigate } from "react-router-dom";
import Header from "../Navigation/Header";
import { useState, useEffect } from "react";
import { FaFile, FaFileUpload } from "react-icons/fa";
import Button from "../components/Button";
import PageFooter from "../Navigation/PageFooter";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ AdminRoutes }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [userLogedIn, setUserLogedIn] = useState(false);
  const [loading, setLoading] = useState(true); // 🔄 Wait until check finishes

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile?.name || "");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const loginToken = sessionStorage.getItem("loginToken");
    if (loginToken) {
      setUserLogedIn(true);
    } else {
      setUserLogedIn(false);
    }
    setLoading(false); // ✅ Check complete
  }, []);

  // ⏳ Wait for session check
  if (loading) return null;

  // 🔐 Redirect to Home if not logged in
  if (!userLogedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="p-3 md:p-4 border-b border-[var(--primary-color)]">
        <div className="container mx-auto">
          <Header />

          {/* File Upload Form */}
          <form className="mt-6 md:mt-10 rounded-md w-full mx-auto lg:my-[50px] lg:w-[80%] lg:mx-auto">
            <div className="border-2 border-dashed border-[var(--secondary-color)] p-4 md:p-6 min-h-[200px] md:min-h-[250px] rounded-lg text-center flex flex-col justify-center items-center">
              <h1 className="mb-4 md:mb-8 text-xl md:text-2xl font-semibold text-[var(--black-color)]">
                PDF, DOCX, JPG – max. 5 MB
              </h1>
              <input
                type="file"
                accept=".pdf,.docx,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <div className="flex flex-col justify-center w-full items-center gap-4 md:gap-5">
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer bg-[#0055a5] text-white h-[45px] md:h-[50px] w-full sm:w-[80%] lg:w-[40%] flex justify-center items-center rounded hover:bg-blue-700 transition-colors"
                >
                  Datei auswählen
                </label>
                {fileName && (
                  <Button
                    type="submit"
                    className="h-[45px] md:h-[50px] w-full sm:w-[80%] lg:w-[40%] bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                    text="Analyse starten"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full mt-4 md:mt-8">
              <div className="w-full sm:w-[50%] flex justify-start items-center gap-2.5">
                {fileName ? (
                  <>
                    <FaFile className="text-4xl md:text-7xl text-gray-500" />
                    <label className="text-sm md:text-base">
                      {fileName.length > 20
                        ? `${fileName.slice(0, 20)}...`
                        : fileName}
                    </label>
                  </>
                ) : (
                  <>
                    <FaFileUpload className="text-4xl md:text-7xl text-gray-500" />
                    <label className="text-gray-500 text-sm md:text-[18px]">
                      File Upload
                    </label>
                  </>
                )}
              </div>

              <NavLink to="" className="text-blue-600 !underline mt-2 sm:mt-0">
                Download
              </NavLink>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-grow gap-2 relative bg-[var(--white-color)] my-4 md:my-[50px]">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <div className="flex-1 p-1 md:p-6 lg:ml-0">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
};

export default AdminLayout;
