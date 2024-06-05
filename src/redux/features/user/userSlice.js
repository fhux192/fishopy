import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  account: user || {
    id: "",
    email: "",
    isAdmin: false,
    name: "",
    cart: user?.cart || [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.account = action.payload;
    },
    logout: (state) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "",
          email: "",
          isAdmin: false,
          name: "",
          cart: [],
        })
      );
      state.account = {};
    },
    addLocalCart: (state, action) => {
      if (action.payload) {
        let findItemIndex = state.account.cart.findIndex((item) => item.id === action.payload.id);
        if (findItemIndex !== -1) {
          state.account.cart[findItemIndex].quantity += action.payload.quantity;
          localStorage.setItem("user", JSON.stringify(state.account));
        } else {
          state.account.cart = [...state.account.cart, action.payload];
        }
        localStorage.setItem("user", JSON.stringify(state.account));
        message.success("Thêm sản phẩm vào giỏ hàng thành công!");
      }
    },
    removeCartLocal: (state, action) => {
      let findItemIndex = state.account.cart.findIndex((item) => item.id === action.payload);
      if (findItemIndex !== -1) {
        state.account.cart.splice(findItemIndex, 1);
        localStorage.setItem("user", JSON.stringify(state.account));
        message.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
      }
    },
  },
});

export const { setCredentials, logout, addLocalCart, removeCartLocal } = userSlice.actions;

export default userSlice.reducer;
