import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isShowModalLogin: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleModalLogin: (state) => {
      state.isShowModalLogin = !state.isShowModalLogin;
    },
  },
});

export const { toggleModalLogin } = toggleSlice.actions;

export default toggleSlice.reducer;
