import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  address: localStorage.getItem("address") ? JSON.parse(localStorage.getItem("address")) : null,
  search: ''
};

export const userSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem("status_login", 0);
      state.cart = []
      state.address = null;
      localStorage.setItem('cart', [])
      localStorage.setItem('address', null)
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.setItem('cart', [])
      localStorage.setItem('address', null)
      localStorage.setItem("status_login", 1);
    },
    addToCart: (state, action) => {
      if (!state.user) {
        notification.error({ msg:"Vui lòng đăng nhập" });
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
    updateCartLocal: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
    chooseProductLocal: (state, action) => {
      const findProduct = state.cart.find((item) => item._id === action.payload._id);
      if (findProduct) {
        findProduct.checked = !findProduct.checked;
      }
    },
    checkAllProductLocal: (state) => {
      if (!state.cart.every((item) => item.checked)) {
        state.cart = state.cart.map((item) => {
          item.checked = true;
          return item;
        });
      } else {
        state.cart = state.cart.map((item) => {
          item.checked = false;
          return item;
        });
      }
    },
    setAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem("address", JSON.stringify(action.payload));
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
    
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
  updateCartLocal,
  chooseProductLocal,
  checkAllProductLocal,
  setAddress,
  setSearch
} = userSlice.actions;

export default userSlice.reducer;
