import { createSlice } from "@reduxjs/toolkit";
let quizResult = localStorage.getItem("quizResultLocal")
  ? JSON.parse(localStorage.getItem("quizResultLocal"))
  : {};
const initialQuizResultState = {
  quizResult: quizResult,
};

const quizResultSlice = createSlice({
  name: "quizResult",
  initialState: initialQuizResultState,
  reducers: {
    setResult(state, action) {
      state.quizResult = action.payload;
    },
  },
});

export const quizResultActions = quizResultSlice.actions;

export default quizResultSlice.reducer;
