import axios from "../utils/axios-customize";

export const callLogin = async (data) => {
  return await axios.post("auth/login", data);
};

export const callRegister = async (data) => {
  return await axios.post("auth/register", data);
};

export const callFetchAccount = async () => {
  return await axios.post("auth/account");
};

export const callLogout = async () => {
  return await axios.post("auth/logout");
};

export const callAddToCart = async (data) => {
  return await axios.post("/user/cart", data);
};

export const callRemoveCartItem = async (id) => {
  return await axios.delete(`/user/cart/${id}`);
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

export const callFetchProduct = async (current, pageSize) => {
  return await axios.get("products?current=" + current + "&pageSize=" + pageSize);
};

export const callFetchProductById = async (id) => {
  return await axios.get(`products/${id}`);
};

export const callUpdateAccount = async (userId, data) => {
  return await axios.put(`/user/data/${userId}`, data);
};

/**
 * nếu upload thì truyền vào fileImg, sửa ảnh thì truyền vào oldImg để server không bị rác
 * @param fileImg
 * @returns
 */
export const callUploadImg = async (fileImg, uploadType) => {
  const formData = new FormData();
  formData.append("fileImg", fileImg);
  return axios({
    url: "file/upload",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": uploadType,
    },
  });
};

export const callUpdateProduct = async (id, data) => {
  return await axios.put(`products/${id}`, data);
};

export const callRemoveAddress = async (id) => {
  return await axios.delete(`/user/address/${id}`);
};

export const callAddAddress = async (data) => {
  return await axios.post("/user/address", data);
};

export const callOrder = async (data) => {
  return await axios.post("/order", data);
};

export const callCalcFee = async (data) => {
  return await axios.get(`/proxy/shipping-fee?${data}`);
};

export const callUpdateCartItem = async (id, data) => {
  return await axios.put(`/user/cart/${id}`, data);
};

export const callFetchOrderByStatus = async (status) => {
  return await axios.get(`/user/orders?status=${status}`);
};

export const callFetchOrderByStatusAdmin = async (status) => {
  return await axios.get(`/order?status=${status}`);
};

export const callUpdateOrderAdmin = async (orderId, data) => {
  return await axios.put(`/order/${orderId}`, data);
};

export const callEditProduct = async (data) => {
  return await axios.put(`products/${data._id}`, data);
};

export const callFetchUser = async (current, pageSize, name) => {
  let url = "";
  if (current) {
    url += `current=${current}&`;
  }
  if (pageSize) {
    url += `pageSize=${pageSize}&`;
  }
  if (name) {
    url += `name=${name}`;
  }
  return await axios.get(`user/data?${url}`);
};

export const callDeleteUser = async (id) => {
  return await axios.delete(`user/data/${id}`);
};
