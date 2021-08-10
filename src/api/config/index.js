import { setAuthTokens, clearAuthTokens, getAccessToken } from "axios-jwt";
import axios from "axios";
import isBefore from "date-fns/isBefore";

const BASE_URL = "https://service-deloy.eastus.cloudapp.azure.com/service";

// 1. Create an axios instance that you wish to apply the interceptor to
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  },
});

// 2. Define token refresh function.

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4. Logging in
export const login = async (params) => {
  const response = await axiosInstance.post("/api/v1/auths/login", params);

  const { status, data } = response;
  const { message = "" } = data;
  if (status === 200) {
    // save tokens to storage
    setAuthTokens({
      accessToken: data.data.token,
    });
    return data.data.token;
  } else {
    throw new Error(message);
  }
};

// 5. Logging out
export const logout = () => {
  clearAuthTokens();
};

export function isExpired() {
  const jwtToken = getAccessToken();
  if (jwtToken) {
    try {
      const [, payload] = jwtToken.split(".");
      const { exp: expires } = JSON.parse(window.atob(payload));
      if (typeof expires === "number") {
        const expiresDate = new Date(expires * 1000);
        if (isBefore(new Date(), expiresDate)) {
          return false;
        }
      }
    } catch {
      return true;
    }
  }
  return true;
}

export default axiosInstance;
