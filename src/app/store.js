import userReducer from "../feature/user/userSlice";
import errorReducer from "../feature/error/errorSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
  },
});
