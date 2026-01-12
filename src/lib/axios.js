import axios from "axios";
import { getStoredAccessToken, setStoredAccessToken } from "./authToken";

const axiosInstance = axios.create({
  baseURL: "https://backend-ideas-8pfw.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// Attach token on refresh
axiosInstance.interceptors.request.use((config) => {
  const token = getStoredAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Refresh token after expire
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const { accessToken: newToken } = await refreshAccessToken();
        setStoredAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
