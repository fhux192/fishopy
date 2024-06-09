import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModalLogin: false,
  isShowDawerCart: false,
  isShowVerify: false,
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
  },
});

export const { toggleModalLogin, toggleModalRegister, toggleDrawerCart, toggleVerify } = toggleSlice.actions;

export default toggleSlice.reducer;
