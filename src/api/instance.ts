import axios from "axios";
import { ApiRoutes } from "./constants";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Проверяем условия для рефреша токена
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        console.log("Attempting token refresh due to 401...");

        // Используем ТОТ ЖЕ axiosInstance, а не чистый axios
        await axiosInstance.post(ApiRoutes.REFRESH_TOKEN);

        console.log("Token refreshed successfully, retrying original request");
        return axiosInstance.request(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Если рефреш не удался, перенаправляем на логин
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    throw error;
  }
);

export default axiosInstance;
