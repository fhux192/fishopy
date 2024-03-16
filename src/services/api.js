import axios from "../utils/axios-customize";

export const callLogin = async (email, password) => {
  const response = await axios.post("/api/users/login", {
    email,
    password,
  });
  return response;
};
