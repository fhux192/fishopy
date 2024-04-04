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

export const callCreateProduct = async (values) => {
  const res = await axios.post("products", values);
  return res;
};

export const callGetAllProduct = async () => {
  const response = await axios.get("products");
  return response;
};

export const callDeleteProduct = async (id) => {
  const response = await axios.delete(`products/${id}`);
  return response;
};

/**
 * nếu upload thì truyền vào fileImg, sửa ảnh thì truyền vào oldImg để server không bị rác
 * @param {*} fileImg
 * @param {*} oldImg
 * @returns
 */
export const callUploadImgFish = async (fileImg) => {
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

export const callDeleteImgFish = async (imgName) => {
  const response = await axios.delete(`file/upload`, { data: { imgName } });
  return response;
};

export const callUpdateProduct = async (id, data) => {
  const response = await axios.put(`products/${id}`, data);
  return response;
};
