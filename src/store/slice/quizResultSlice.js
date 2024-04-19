import { createSlice } from "@reduxjs/toolkit";
let quizResult = localStorage.getItem("quizResultLocal")
  ? JSON.parse(localStorage.getItem("quizResultLocal"))
  : {};
const initialQuizResultState = {
  quizResult: quizResult,
  // categoryName: "",
  // questionsAnswers: [],
  // score: 0,
};

const quizResultSlice = createSlice({
  name: "quizResult",
  initialState: initialQuizResultState,
  reducers: {
    setResult(state, action) {
      // const { categoryName, data } = action.payload;
      state.quizResult = action.payload;
    },
  },
});

export const quizResultActions = quizResultSlice.actions;

export default quizResultSlice.reducer;
