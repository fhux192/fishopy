import axios from "../utils/axios-customize";

// -------------- AUTH ---------------
export const free_login = async (data) => {
  return await axios.post("auth/login", data);
};

export const free_register = async (data) => {
  return await axios.post("auth/register", data);
};

export const user_fetchAccount = async () => {
  return await axios.post("auth/account");
};

export const user_logout = async () => {
  return await axios.post("auth/logout");
};

export const free_google_login = async (tokenId) => {
  return await axios.post("/auth/google_login", { tokenId });
};
// -------------- LOCATION ---------------
export const free_getCities = async () => {
  return await axios.get("location/city");
};

export const free_getDistricts = async (provinceId) => {
  return await axios.get(`location/district/${provinceId}`);
};

export const free_getWards = async (districtId) => {
  return await axios.get(`location/ward/${districtId}`);
};

export const free_addOrderDetail = async (data) => {
  return await axios.post("/cart", data);
};

export const free_getProducts_byFields = async (query, sort, limit, page) => {
  return await axios.get(
    `product?query=${encodeURIComponent(
      JSON.stringify(query)
    )}&sort=${encodeURIComponent(
      JSON.stringify(sort)
    )}&limit=${limit}&page=${page}`
  );
};

export const free_getCombos_byFields = async (query, sort, limit, page) => {
  return await axios.get(
    `combo?query=${encodeURIComponent(
      JSON.stringify(query)
    )}&sort=${encodeURIComponent(
      JSON.stringify(sort)
    )}&limit=${limit}&page=${page}`
  );
};

export const free_addOrder = async (data) => {
  return await axios.post("order", data);
};

// -------------- UPLOAD IMAGE ---------------
/**
 *
 * @param fileImg: file hình ảnh
 * @param uploadType: 'avatar' | 'fish' upload avatar thì truyền vào 'avatar', upload cá thì truyền vào 'fish'
 * @param oldImage: string link ảnh cũ, nếu có thì truyền vào để xóa trên cloudinary để không bị rác
 * @returns
 */
export const user_uploadImage = async (fileImg, uploadType, oldImage = "") => {
  const formData = new FormData();
  formData.append("fileImg", fileImg);
  if (oldImage) {
    formData.append("oldImage", oldImage);
  }

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

export const user_addToCart = async (data) => {
  return await axios.post("/cart", data);
};

export const user_deleteCartItem = async (id) => {
  return await axios.delete(`/cart/${id}`);
};

export const user_updateCartItem = async (id, data) => {
  return await axios.put(`/cart/${id}`, data);
};

export const user_updateAccount = async (id, data) => {
  return await axios.put(`user/${id}`, data);
};

export const user_addAddress = async (data) => {
  return await axios.post("/address", data);
};

export const user_deleteAddress = async (id) => {
  return await axios.delete(`/address/${id}`);
};

export const user_updateAddress = async (id, data) => {
  return await axios.put(`address/${id}`, data);
};

export const update_updateOrder = async (id, data) => {
  return await axios.put(`order/${id}`, data);
};

export const user_getOrder_byFields = async (query, sort, limit, page) => {
  return await axios.get(
    `order?query=${encodeURIComponent(
      JSON.stringify(query)
    )}&sort=${encodeURIComponent(
      JSON.stringify(sort)
    )}&limit=${limit}&page=${page}`
  );
};

export const user_getOrderDetail_byFields = async (
  query,
  sort,
  limit,
  page
) => {
  return await axios.get(
    `cart?query=${encodeURIComponent(
      JSON.stringify(query)
    )}&sort=${encodeURIComponent(
      JSON.stringify(sort)
    )}&limit=${limit}&page=${page}`
  );
};

/**
 *
 * @param {*} oldImage string link ảnh cũ, nếu có thì truyền vào để xóa trên cloudinary để không bị rác
 * @returns
 */
export const user_deleteImage = async (oldImage) => {
  return axios.post("/file/delete", { oldImage });
};

// ---------------- ADMIN ----------------

export const admin_getDataDashboard = async () => {
  return await axios.get("dashboard");
};

// -------------- PRODUCT ---------------
export const admin_getProducts_byFields = async (query, sort, limit, page) => {
  return await axios.get(
    `product?query=${encodeURIComponent(
      JSON.stringify(query)
    )}&sort=${encodeURIComponent(
      JSON.stringify(sort)
    )}&limit=${limit}&page=${page}`
  );
};

export const admin_getProduct = async (id) => {
  return await axios.get(`product/${id}`);
};

export const admin_updateProduct = async (id, data) => {
  return await axios.put(`product/${id}`, data);
};

export const admin_addProduct = async (data) => {
  return await axios.post("product", data);
};

export const admin_deleteProduct = async (id) => {
  return await axios.delete(`product/${id}`);
};

// -------------- USER ---------------
export const admin_getUsers_byFields = async (query, sort, limit, page) => {
  return await axios.get(
    `user?query=${encodeURIComponent(
      JSON.stringify(query)
    )}&sort=${encodeURIComponent(
      JSON.stringify(sort)
    )}&limit=${limit}&page=${page}`
  );
};

export const admin_updateUser = async (id, data) => {
  return await axios.put(`user/${id}`, data);
};

export const admin_addUser = async (data) => {
  return await axios.post("user", data);
};

export const admin_deleteUser = async (id) => {
  return await axios.delete(`user/${id}`);
};

// -------------- ORDER ---------------
export const admin_getOrders_byFields = async (query, sort, limit, page) => {
  return await axios.get(
    `order?query=${encodeURIComponent(
      JSON.stringify(query)
    )}&sort=${encodeURIComponent(
      JSON.stringify(sort)
    )}&limit=${limit}&page=${page}`
  );
};

export const admin_updateOrder = async (id, data) => {
  return await axios.put(`order/${id}`, data);
};

export const admin_deleteOrder = async (id) => {
  return await axios.delete(`order/${id}`);
};

export const admin_getOrderDetail_byFields = async (
  query,
  sort,
  limit,
  page
) => {
  return await axios.get(
    `cart?query=${encodeURIComponent(
      JSON.stringify(query)
    )}&sort=${encodeURIComponent(
      JSON.stringify(sort)
    )}&limit=${limit}&page=${page}`
  );
};

// -------------- COMBO ---------------
export const admin_getCombos_byFields = async (query, sort, limit, page) => {
  return await axios.get(
    `combo?query=${encodeURIComponent(
      JSON.stringify(query)
    )}&sort=${encodeURIComponent(
      JSON.stringify(sort)
    )}&limit=${limit}&page=${page}`
  );
};

export const admin_updateCombo = async (id, data) => {
  return await axios.put(`combo/${id}`, data);
};

export const admin_addCombo = async (data) => {
  return await axios.post("combo", data);
};

export const admin_deleteCombo = async (id) => {
  return await axios.delete(`combo/${id}`);
};
