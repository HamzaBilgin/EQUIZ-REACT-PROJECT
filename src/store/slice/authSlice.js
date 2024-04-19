import { createSlice } from "@reduxjs/toolkit";

let isAuthenticated = localStorage.getItem("isAuthenticated")
  ? JSON.parse(localStorage.getItem("isAuthenticated"))
  : false;

const initialAuthState = {
  isAuthenticated: isAuthenticated,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
