import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModalLogin: false,
  isShowDawerCart: false,
  isShowVerify: false,
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
    toggleModalAddUser: (state) => {
      state.modalAddUser = !state.modalAddUser;
    },
    toggleModalEditUser: (state) => {
      state.modalEditUser = !state.modalEditUser;
    },

    // chỉ dùng hàm toggle, bỏ hàm hết cách hàm phía trên
    // toggle modal nào truyền vào payload là tên modal
    toggle: (state, action) => {
      state[action.payload] = !state[action.payload];
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
  toggleModalAddUser,
  toggleModalEditUser,
  toggle,
} = toggleSlice.actions;

export default toggleSlice.reducer;
