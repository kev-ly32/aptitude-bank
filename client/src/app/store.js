import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../reducers/Authentication/userSlice";
import accountReducer from "../reducers/Account/accountSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    account: accountReducer,
  },
});
