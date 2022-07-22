import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";
import errorReducer from "../feature/error/errorSlice";
import applicationReducer from "../feature/application/applicationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    application: applicationReducer,
  },
});
