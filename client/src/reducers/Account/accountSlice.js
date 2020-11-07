import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addSavingsAccount = createAsyncThunk(
  "account/addSavingsAccount",
  async (data) => {
    const response = await fetch("/new-account", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    });
    const newAccount = await response.json();
    return newAccount;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    savings: [],
    tfsa: [],
  },
  reducers: {},
  extraReducers: {
    [addSavingsAccount.fulfilled]: (state, action) => {
      state.savings = [...state.savings, action.payload];
    },
  },
});

export const selectAccount = (state) => state.account.savings;

export default accountSlice.reducer;
