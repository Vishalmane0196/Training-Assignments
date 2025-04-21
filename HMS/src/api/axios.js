import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
});

// Add token to headers on every request

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration and refresh token

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      localStorage.clear();

      // window.location.href = "/account/user/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
