import axiosInstance from "../lib/axios";

export const register = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Register failed", error);
    throw new Error("Register failed");
  }
};

export const login = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed", error);
    throw new Error("Logout failed");
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post("/auth/refresh");
    return response.data;
  } catch (error) {
    console.error("Refresh token failed", error);
    throw new Error("Refresh token failed");
  }
};
