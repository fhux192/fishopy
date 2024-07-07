import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  userInfo: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
      localStorage.setItem("status_login", 0);
    },
    logout: (state) => {
      state.userInfo = null;
      state.isLoading = false;
      localStorage.setItem("status_login", 1);
    },
    addToCart: (state, action) => {
      if (!state.userInfo) {
        notification.error({ message: "Vui lòng đăng nhập" });
        return;
      }

      const { product, quantity } = action.payload;

      const productExist = state.userInfo.cart.find(
        (item) => item._id == product._id
      );

      if (productExist) {
        productExist.quantity += quantity;
      } else {
        state.userInfo.cart.push({ ...product, quantity });
      }
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logout, setIsLoading, addToCart } =
  userSlice.actions;

export default userSlice.reducer;
