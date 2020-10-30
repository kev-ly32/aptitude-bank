import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginRegister = createAsyncThunk(
  "authenticated/authenticate",
  async (user) => {
    console.log(user);
    const response = await fetch("/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json" },
    });
    const userData = await response.json();
    if (userData.err) {
      console.log(userData.msg);
      return null;
    }
    //save user data to state.user
    return userData;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
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
    [loginRegister.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
