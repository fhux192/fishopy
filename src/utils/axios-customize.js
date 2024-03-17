import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
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
