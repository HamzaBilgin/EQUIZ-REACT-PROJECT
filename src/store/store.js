import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import userInfoSlice from "./slice/userInfoSlice";
const store = configureStore({
  reducer: {
    authReducer: authSlice,
    userInfoReducer: userInfoSlice,
  },
});

export default store;
