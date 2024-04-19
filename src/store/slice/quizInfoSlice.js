import { createSlice } from "@reduxjs/toolkit";

let quizInfo = localStorage.getItem("quizInfo")
  ? JSON.parse(localStorage.getItem("quizInfo"))
  : {};

const quizInfoSlice = createSlice({
  name: "quizInfo",
  initialState: {
    quizInfo: quizInfo,
  },
  reducers: {
    setQuizInfo(state, action) {
      state.quizInfo = action.payload;
    },
  },
});

export const quizInfoActions = quizInfoSlice.actions;

export default quizInfoSlice.reducer;
