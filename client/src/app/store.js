import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../reducers/Authentication/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
