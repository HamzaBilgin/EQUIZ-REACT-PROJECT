import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
};

const apiRequestSlice = createSlice({
  name: "apiRequest",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
  },
});

export const apiRequestActions = apiRequestSlice.actions;

export default apiRequestSlice.reducer;
