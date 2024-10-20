import axios from "../utils/axios-customize";

// -------------- AUTH ---------------
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

export const callGooglelogin = async (tokenId) => {
  return await axios.post("/auth/google_login", { tokenId });
};

// ---------------- USER ----------------
export const callUpdateAccount = async (userId, data) => {
  return await axios.put(`/user/account/${userId}`, data);
};

// ---------------- CART ----------------
export const callAddToCart = async (data) => {
  return await axios.post("/user/cart", data);
};

export const callRemoveCartItem = async (id) => {
  return await axios.delete(`/user/cart/${id}`);
};

export const callUpdateCartItem = async (id, data) => {
  return await axios.put(`/user/cart/${id}`, data);
};
/**
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

// ---------------- ADDRESS ----------------
export const callRemoveAddress = async (id) => {
  return await axios.delete(`/user/address/${id}`);
};

export const callAddAddress = async (data) => {
  return await axios.post("/user/address", data);
};

export const callEditAddress = async (addressId, data) => {
  return await axios.put(`user/address/${addressId}`, data);
}

// ---------------- SHIPPING FEE ----------------
export const callCalcFee = async (data) => {
  return await axios.get(`/shipping-fee?${data}`);
};

export const callGetCity = async () => {
  return await axios.get("user/city");
}

export const callGetDistrict = async (provinceId) => {
  return await axios.get(`user/district?provinceId=${provinceId}`);
}

export const callGetWard = async (districtId) => {
  return await axios.get(`user/ward?districtId=${districtId}`);
}

// ---------------- PRODUCT ----------------
export const callGetProductDetail = async (id) => {
  return await axios.get(`user/product/${id}`);
}

export const callGetProducts = async (query, sort, page, limit) => {
  return await axios.get(`user/product?query=${encodeURIComponent(JSON.stringify(query))}&sort=${encodeURIComponent(JSON.stringify(sort))}&page=${page}&limit=${limit}`);
}

// ---------------- ORDER ----------------
export const callUpdateOrder = async (id, data) => {
  return await axios.put(`user/order/${id}`, data);
}

export const callCreateOrder = async (data) => {
  return await axios.post("user/order", data);
}

export const callGetOrders = async (query, sort, page, limit) => {
  return await axios.get(`user/order?query=${encodeURIComponent(JSON.stringify(query))}&sort=${encodeURIComponent(JSON.stringify(sort))}&page=${page}&limit=${limit}`);
}

// ================== ADMIN ==================
// -------------- PRODUCT ---------------
export const callGetProductsAdmin = async (query, sort, page, limit) => {
  return await axios.get(`admin/product?query=${encodeURIComponent(JSON.stringify(query))}&sort=${encodeURIComponent(JSON.stringify(sort))}&page=${page}&limit=${limit}`);
}

export const callGetProductDetailAdmin = async (id) => {
  return await axios.get(`admin/product/${id}`);
}

export const callUpdateProductAdmin = async (id, data) => {
  return await axios.put(`admin/product/${id}`, data);
}

export const callCreateProductAdmin = async (data) => {
  return await axios.post("admin/product", data);
}

export const callDeleteProductAdmin = async (id) => {
  return await axios.delete(`admin/product/${id}`);
}
// -------------- USER ---------------
export const callGetUsersAdmin = async (query, sort, page, limit) => {
  return await axios.get(`admin/user?query=${encodeURIComponent(JSON.stringify(query))}&sort=${encodeURIComponent(JSON.stringify(sort))}&page=${page}&limit=${limit}`);
}

export const callGetUserDetailAdmin = async (id) => {
  return await axios.get(`admin/user/${id}`);
}

export const callUpdateUserAdmin = async (id, data) => {
  return await axios.put(`admin/user/${id}`, data);
}

export const callCreateUserAdmin = async (data) => {
  return await axios.post("admin/user", data);
}

export const callDeleteUserAdmin = async (id) => {
  return await axios.delete(`admin/user/${id}`);
}


export const callGetOrdersAdmin = async (query, sort, page, limit) => {
  return await axios.get(`admin/order?query=${encodeURIComponent(JSON.stringify(query))}&sort=${encodeURIComponent(JSON.stringify(sort))}&page=${page}&limit=${limit}`);
}

// -------------- ORDER ---------------
export const callGetOrderDetailAdmin = async (id) => {
  return await axios.get(`admin/order/${id}`);
}

export const callUpdateOrderAdmin = async (id, data) => {
  return await axios.put(`admin/order/${id}`, data);
}

export const callDeleteOrderAdmin = async (id) => {
  return await axios.delete(`admin/order/${id}`);
}

// -------------- DASHBOARD ---------------
export const callGetDataDashboardAdmin = async () => {
  return await axios.get("admin/dashboard");
}