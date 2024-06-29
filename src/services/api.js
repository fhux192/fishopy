import axios from "../utils/axios-customize";

export const callLogin = async (data) => {
  return await axios.post("auth/login", data);
};

export const callRegister = async (data) => {
  return await axios.post("auth/register", data);
};

export const callLogout = async () => {
  return await axios.post("auth/logout");
};

export const callCreateProduct = async (values) => {
  return await axios.post("products", values);
};

export const callGetAllProduct = async () => {
  return await axios.get("products");
};

export const callDeleteProduct = async (id) => {
  return await axios.delete(`products/${id}`);
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
  return await axios.delete(`file/upload`, { data: { imgName } });
};

export const callUpdateProduct = async (id, data) => {
  return await axios.put(`products/${id}`, data);
};
