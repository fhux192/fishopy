import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModalLogin: false,
  isShowDawerCart: false,
  isShowVerify: false,
  isShowSlideBar: false,
  modalRegister: false,
  modalAddProduct: false,
  modalAddAddress: false,
  modalOrderDetail: false,
  modalEditProduct: false,
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
    },
    toggleModalAddProduct: (state) => {
      state.modalAddProduct = !state.modalAddProduct;
    },
    toggleModalAddAddress: (state) => {
      state.modalAddAddress = !state.modalAddAddress;
    },
    toggleModalOrderDetail: (state) => {
      state.modalOrderDetail = !state.modalOrderDetail;
    },
    toggleModalEditProduct: (state) => {
      state.modalEditProduct = !state.modalEditProduct;
    },
  },
});

export const {
  toggleModalLogin,
  toggleModalRegister,
  toggleDrawerCart,
  toggleVerify,
  toggleSlideBar,
  toggleModalAddProduct,
  toggleModalAddAddress,
  toggleModalOrderDetail,
  toggleModalEditProduct,
} = toggleSlice.actions;

export default toggleSlice.reducer;
