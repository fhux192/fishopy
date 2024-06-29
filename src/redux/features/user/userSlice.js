import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  cartLocal: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      localStorage.setItem("userInfo", null);
      state.userInfo = null;
    },
    changeQuantityLocalCart: (state, action) => {
      let findItemIndex = state.cartLocal.findIndex((item) => item.id === action.payload.item.id);

      if (findItemIndex !== -1) {
        if (action.payload.type == "increase") {
          state.cartLocal[findItemIndex].quantity += 1;
          localStorage.setItem("cartLocal", JSON.stringify(state.cartLocal));
        } else if (action.payload.type == "decrease") {
          if (state.cartLocal[findItemIndex].quantity > 1)
            state.cartLocal[findItemIndex].quantity -= 1;
          localStorage.setItem("cartLocal", JSON.stringify(state.cartLocal));
        }
      }
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const findItemIndex = state.cartLocal.findIndex((item) => item.id === id);

      if (findItemIndex !== -1) {
        if (quantity <= 0) {
          state.cartLocal.splice(findItemIndex, 1);
          message.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
        } else {
          state.cartLocal[findItemIndex].quantity = quantity;
        }
        localStorage.setItem("cartLocal", JSON.stringify(state.cartLocal));
      }
    },
    addLocalCart: (state, action) => {
      if (action.payload) {
        let findItemIndex = state.cartLocal.findIndex((item) => item.id === action.payload.id);
        if (findItemIndex !== -1) {
          state.cartLocal[findItemIndex].quantity += action.payload.quantity;
          localStorage.setItem("user", JSON.stringify(state.cartLocal));
        } else {
          state.cartLocal = [...state.cartLocal, action.payload];
        }
        localStorage.setItem("cartLocal", JSON.stringify(state.cartLocal));
        message.success("Thêm sản phẩm vào giỏ hàng thành công!");
      }
    },
    removeCartLocal: (state, action) => {
      let findItemIndex = state.cartLocal.findIndex((item) => item.id === action.payload);
      if (findItemIndex !== -1) {
        state.cartLocal.splice(findItemIndex, 1);
        localStorage.setItem("cartLocal", JSON.stringify(state.user));
        message.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
      }
    },
  },
});

export const {
  setCredentials,
  logout,
  addLocalCart,
  removeCartLocal,
  changeQuantityLocalCart,
  updateCartQuantity,
} = userSlice.actions;

export default userSlice.reducer;
