import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";

const store = configureStore({
  reducer: {
    authReducer: authSlice,
  },
});

export default store;
