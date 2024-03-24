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

export const callCreateProduct = async (data) => {
  const response = await axios.post("products", data);
  return response;
};

export const callGetAllProduct = async () => {
  const response = await axios.get("products");
  return response;
};

export const callDeleteProduct = async (id) => {
  const response = await axios.delete(`products/${id}`);
  return response;
};

export const callUploadImgeFish = async (fileImg) => {
  const formData = new FormData();
  formData.append("fileImg", fileImg);
  return axios({
    url: "file/upload",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "fish",
    },
  });
};
