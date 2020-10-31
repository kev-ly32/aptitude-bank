import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const authenticate = createAsyncThunk(
  "user/authenticate",
  async (user) => {
    const response = await fetch("/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json" },
    });
    const userData = await response.json();
    if (userData.err) {
      throw Error(userData.msg);
    }
    //save user data to state.user
    return userData;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [authenticate.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [authenticate.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
