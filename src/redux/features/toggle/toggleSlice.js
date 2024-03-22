import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModalLogin: false,
  modalRegister: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleModalLogin: (state) => {
      state.isShowModalLogin = !state.isShowModalLogin;
    },
    toggleModalRegister: (state) => {
      state.modalRegister = !state.modalRegister;
    },
  },
});

export const { toggleModalLogin, toggleModalRegister } = toggleSlice.actions;

export default toggleSlice.reducer;
