import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const authSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    authenticate(state, action) {
      state = action;
    },
  },
});

export const { authenticate } = authSlice.actions;

export default authSlice.reducer;
