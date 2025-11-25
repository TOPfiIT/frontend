import axios from "axios";
import { ApiRoutes } from "./constants";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const origin = error.config;
    if (
      error.response &&
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      origin._isRetry = true;
      try {
        await axios.head(
          `${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.REFRESH_TOKEN}`,
          { withCredentials: true }
        );
        return axiosInstance.request(origin);
      } catch (e) {
        console.log();
      }
    }
    throw error;
  }
);

export default axiosInstance;
