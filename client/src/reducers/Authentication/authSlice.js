import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const authSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
