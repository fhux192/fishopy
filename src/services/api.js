import axios from "../utils/axios-customize";

export const callLogin = async (email, password) => {
  const response = await axios.post("users/login", {
    email,
    password,
  });
  return response;
};

export const callRegister = async (data) => {
  const response = await axios.post("users/register", data);
  return response;
};
