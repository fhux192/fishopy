import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModalLogin: false,
  isShowDawerCart: false,
  isShowVerify: false,
  isShowSlideBar: false,
  modalRegister: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleModalLogin: (state) => {
      state.isShowModalLogin = !state.isShowModalLogin;
    },
    toggleDrawerCart: (state) => {
      state.isShowDawerCart = !state.isShowDawerCart;
    },
    toggleVerify: (state) => {
      state.isShowVerify = !state.isShowVerify;
    },
    toggleModalRegister: (state) => {
      state.modalRegister = !state.modalRegister;
    },
    toggleSlideBar: (state) => {
      state.isShowSlideBar = !state.isShowSlideBar;
    }
  },
});

export const { toggleModalLogin, toggleModalRegister, toggleDrawerCart, toggleVerify,toggleSlideBar } = toggleSlice.actions;

export default toggleSlice.reducer;
