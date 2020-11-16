import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccounts = createAsyncThunk(
  "account/fetchAccounts",
  async (userID) => {
    const response = await fetch(`/accounts/${userID.userID}`, {
      method: "GET",
    });
    const allAccounts = await response.json();
    return allAccounts;
  }
);

export const addAccount = createAsyncThunk(
  "account/addAccount",
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
export const deposit = createAsyncThunk("account/deposit", async (data) => {
  const response = await fetch("/deposit", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  });
  const newBalance = await response.json();
  return newBalance;
});

export const payBill = createAsyncThunk("account/payBill", async (data) => {
  const response = await fetch("/pay-bill", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  });
  const newBalance = await response.json();
  if (newBalance.err) {
    throw Error(newBalance.msg);
  }
  return newBalance;
});

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    error: null,
  },
  reducers: {
    logout2: (state) => {
      state.accounts = [];
    },
  },
  extraReducers: {
    [addAccount.fulfilled]: (state, action) => {
      state.accounts = state.accounts.concat(action.payload);
    },
    [fetchAccounts.fulfilled]: (state, action) => {
      state.accounts = state.accounts.concat(action.payload);
    },
    [deposit.fulfilled]: (state, action) => {
      const updatedAccount = state.accounts.findIndex(
        (account) => account._id === action.payload._id
      );
      state.accounts[updatedAccount] = action.payload;
    },
    [payBill.fulfilled]: (state, action) => {
      const updatedAccount = state.accounts.findIndex(
        (account) => account._id === action.payload._id
      );
      state.accounts[updatedAccount] = action.payload;
    },
    [payBill.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});

export const { logout2 } = accountSlice.actions;
export const selectAccount = (state) => state.account.accounts;

export default accountSlice.reducer;
