import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    addresses: localStorage.getItem("addresses")
      ? JSON.parse(localStorage.getItem("addresses"))
      : [],
  },
  isLoading: true,
  search: "",
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
    },
    logout: (state) => {
      state.user = {
        cart: localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : [],
        addresses: localStorage.getItem("addresses")
          ? JSON.parse(localStorage.getItem("addresses"))
          : [],
      };
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.setItem("status_login", 1);
    },
    updateAccount: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  setCredentials,
  logout,
  updateAccount,
  setLoading,
  setSearch,
  setSearchRef,
} = userSlice.actions;

export default userSlice.reducer;
