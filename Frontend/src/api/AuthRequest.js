import axios from "axios";
import { toast } from "react-toastify"; // Optional if you want to show toast here directly

const Authapi = axios.create({
  baseURL: "http://localhost:8050", 
  timeout: 30000,
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
