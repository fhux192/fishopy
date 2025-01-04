import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL + "/api/v1";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response?.data ? response?.data : response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.msg === "Phiên đăng nhập hết hạn hoặc không hợp lệ"
    ) {
      localStorage.setItem("status_login", "1");
    }
    return error?.response?.data ? error.response.data : Promise.reject(error);
  }
);

export default instance;
