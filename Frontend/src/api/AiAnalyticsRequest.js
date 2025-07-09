import axios from "axios";
import { toast } from "react-toastify"; // Optional if you want to show toast here directly

const AiAnalyticsApi = axios.create({
  baseURL: "https://e0a43e522c53.ngrok-free.app",
  timeout: 30000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

AiAnalyticsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional toast directly here
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error); // ✅ Important!
  }
);

export default AiAnalyticsApi;
