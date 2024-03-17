import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: JSON.parse(localStorage.getItem("user")) || {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.account = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.account = {};
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;
