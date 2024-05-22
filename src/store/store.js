import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import quizInfoSlice from "./slice/quizInfoSlice";
import quizResultSlice from "./slice/quizResultSlice";
const store = configureStore({
  reducer: {
    authReducer: authSlice,
    quizInfoReducer: quizInfoSlice,
    quizResultReducer: quizResultSlice,
  },
});

export default store;
