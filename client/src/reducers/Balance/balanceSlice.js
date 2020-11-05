import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balance: 0,
    error: null,
  },
  reducers: {},
  extraReducers: {},
});

export default balanceSlice.reducer;
