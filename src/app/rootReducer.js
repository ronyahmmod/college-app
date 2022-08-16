import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";
import errorReducer from "../feature/error/errorSlice";
import applicationReducer from "../feature/application/applicationSlice";

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  application: applicationReducer,
});
