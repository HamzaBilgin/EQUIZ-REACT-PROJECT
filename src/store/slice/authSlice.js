import { createSlice } from "@reduxjs/toolkit";

let user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : [];

const initialAuthState = {
  user: user,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = [];
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
