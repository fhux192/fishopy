import axios from "axios";

const baseURL = import.meta.env.BASE_URL + "/api";

const instance = axios.create({
  baseURL: "https://fish-web-be.onrender.com/api/",
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
