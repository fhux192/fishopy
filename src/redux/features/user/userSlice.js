import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cartLocal: localStorage.getItem("cartLocal")
    ? JSON.parse(localStorage.getItem("cartLocal"))
    : [],
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
      let findItemIndex = state.cartLocal.findIndex(
        (item) => item.id === action.payload.item.id
      );

      if (findItemIndex !== -1) {
        if (action.payload.type === "increase") {
          state.cartLocal[findItemIndex].quantity += 1;
          localStorage.setItem("cartLocal", JSON.stringify(state.cartLocal));
        } else if (action.payload.type === "decrease") {
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
          const removedItem = state.cartLocal[findItemIndex];
          state.cartLocal.splice(findItemIndex, 1);
          notification.success({
            message: "Xóa thành công!",
            description: ` ${removedItem.title}`,
            duration: 2,
          });
        } else {
          state.cartLocal[findItemIndex].quantity = quantity;
        }
        localStorage.setItem("cartLocal", JSON.stringify(state.cartLocal));
      }
    },

    addLocalCart: (state, action) => {
      if (action.payload) {
        let findItemIndex = state.cartLocal.findIndex(
          (item) => item.id === action.payload.id
        );
        if (findItemIndex !== -1) {
          state.cartLocal[findItemIndex].quantity += action.payload.quantity;
        } else {
          state.cartLocal = [...state.cartLocal, action.payload];
        }
        localStorage.setItem("cartLocal", JSON.stringify(state.cartLocal));
        notification.success({
          message: "Thêm thành công!",
          description: `${action.payload.title}`,
          duration: 2,
        });
      }
    },

    removeCartLocal: (state, action) => {
      let findItemIndex = state.cartLocal.findIndex(
        (item) => item.id === action.payload
      );
      if (findItemIndex !== -1) {
        const removedItem = state.cartLocal[findItemIndex];
        state.cartLocal.splice(findItemIndex, 1);
        localStorage.setItem("cartLocal", JSON.stringify(state.cartLocal));
        notification.success({
          message: "Xóa thành công!",
          description: `${removedItem.title}`,
          duration: 2,
        });
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
