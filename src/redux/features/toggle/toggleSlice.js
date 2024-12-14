import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerCart: false,
  modalLogin: false,
  modalRegister: false,
  showVerify: false,
  isShowSlideBar: false,
  modalRegister: false,
  modalAddProduct: false,
  modalEditProduct: false,
  modalAddAddress: false,
  modalOrderDetail: false,
  modalAddUser: false,
  modalEditUser: false,
  modalEditAddress: false,
  modalAddCombo: false,
  modalEditCombo: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggle: (state, action) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { toggle } = toggleSlice.actions;

export default toggleSlice.reducer;
