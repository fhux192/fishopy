import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModalLogin: false,
  isShowDawerCart: false,
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
    toggleModalRegister: (state) => {
      state.modalRegister = !state.modalRegister;
    },
  },
});

export const { toggleModalLogin, toggleModalRegister, toggleDrawerCart } = toggleSlice.actions;

export default toggleSlice.reducer;
