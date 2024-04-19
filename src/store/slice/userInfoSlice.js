import { createSlice } from "@reduxjs/toolkit";

let userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: userInfo,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;

export default userInfoSlice.reducer;
