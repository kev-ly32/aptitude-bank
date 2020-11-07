import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccounts = createAsyncThunk(
  "account/fetchAccounts",
  async (userID) => {
    console.log(userID);
    const response = await fetch(`/accounts/${userID.userID}`, {
      method: "GET",
    });
    const allAccounts = await response.json();
    return allAccounts;
  }
);

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
  reducers: {
    logout2: (state) => {
      state.savings = [];
      state.tfsa = [];
    },
  },
  extraReducers: {
    [addSavingsAccount.fulfilled]: (state, action) => {
      state.savings = state.savings.concat(action.payload);
    },
    [fetchAccounts.fulfilled]: (state, action) => {
      state.savings = state.savings.concat(action.payload);
    },
  },
});

export const { logout2 } = accountSlice.actions;
export const selectAccount = (state) => state.account.savings;

export default accountSlice.reducer;
