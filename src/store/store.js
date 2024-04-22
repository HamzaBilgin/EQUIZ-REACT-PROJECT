import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import userInfoSlice from "./slice/userInfoSlice";
import quizInfoSlice from "./slice/quizInfoSlice";
import quizResultSlice from "./slice/quizResultSlice";
import makeQuizInfoSlice from "./slice/makeQuizInfoSlice";
const store = configureStore({
  reducer: {
    authReducer: authSlice,
    userInfoReducer: userInfoSlice,
    quizInfoReducer: quizInfoSlice,
    quizResultReducer: quizResultSlice,
    makeQuizInfoReducer: makeQuizInfoSlice,
  },
});

export default store;
