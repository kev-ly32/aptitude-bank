import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../reducers/Authentication/authSlice";

export default configureStore({
  reducer: {
    authenticated: authReducer,
  },
});
