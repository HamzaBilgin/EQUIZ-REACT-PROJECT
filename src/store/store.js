import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import quizInfoSlice from "./slice/quizInfoSlice";
const store = configureStore({
  reducer: {
    authReducer: authSlice,
    quizInfoReducer: quizInfoSlice,
  },
});

export default store;
