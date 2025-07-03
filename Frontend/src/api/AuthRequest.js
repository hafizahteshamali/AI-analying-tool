import axios from "axios";
import { toast } from "react-toastify"; // Optional if you want to show toast here directly

const Authapi = axios.create({
  baseURL: "https://ai-analying-tool-git-main-ahteshamalis-projects.vercel.app",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

Authapi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional toast directly here
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error); // ✅ Important!
  }
);

export default Authapi;
