import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../reducers/Authentication/userSlice";
import balanceReducer from "../reducers/Balance/balanceSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    balance: balanceReducer,
  },
});
