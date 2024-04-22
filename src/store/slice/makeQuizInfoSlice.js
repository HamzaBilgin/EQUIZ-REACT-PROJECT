import { createSlice } from "@reduxjs/toolkit";

let makeQuizInfo = localStorage.getItem("makeQuizInfo")
  ? JSON.parse(localStorage.getItem("makeQuizInfo"))
  : {};

const makeQuizInfoSlice = createSlice({
  name: "quizInfo",
  initialState: {
    makeQuizInfo: makeQuizInfo,
  },
  reducers: {
    setMakeQuizInfo(state, action) {
      state.quizInfo = action.payload;
    },
  },
});

export const makeQuizInfoActions = makeQuizInfoSlice.actions;

export default makeQuizInfoSlice.reducer;
