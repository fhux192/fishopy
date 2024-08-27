import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  user: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("status_login", 0);
    },
    logout: (state) => {
      state.user = null;
      localStorage.setItem("status_login", 1);
    },
    addToCart: (state, action) => {
      if (!state.user) {
        notification.error({ message: "Vui lòng đăng nhập" });
        return;
      }

      const { product, quantity } = action.payload;

      const productExist = state.user.cart.find((item) => item._id == product._id);

      if (productExist) {
        productExist.quantity += quantity;
      } else {
        state.user.cart.push({ product, quantity, _id: action.payload._id });
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateAccount: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    checkAllProduct: (state) => {
      if (!state.user.cart.every((item) => item.checked)) {
        state.user.cart = state.user.cart.map((item) => {
          item.checked = true;
          return item;
        });
      } else {
        state.user.cart = state.user.cart.map((item) => {
          item.checked = false;
          return item;
        });
      }
    },
    chooseProduct: (state, action) => {
      const findProduct = state.user.cart.find((item) => item._id === action.payload._id);
      if (findProduct) {
        findProduct.checked = !findProduct.checked;
      }
    },
  },
});

export const {
  setCredentials,
  logout,
  setLoading,
  addToCart,
  updateAccount,
  checkAllProduct,
  chooseProduct,
} = userSlice.actions;

export default userSlice.reducer;
