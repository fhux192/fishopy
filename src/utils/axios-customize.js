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
    return error?.response?.data ? error.response.data : Promise.reject(error);
  }
);

export default instance;
