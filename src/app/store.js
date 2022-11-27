import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";
import errorReducer from "../feature/error/errorSlice";
import applicationReducer from "../feature/application/applicationSlice";
import uiReducer from "../feature/ui/uiSlice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: userReducer,
    error: errorReducer,
    application: applicationReducer,
    ui: uiReducer,
  },
});
