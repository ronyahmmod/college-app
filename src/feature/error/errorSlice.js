import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    error: {
      errorOccured: false,
      errorMessage: "",
      errorCode: "",
    },
  },
  reducers: {
    setError: (state, action) => {
      state.error.errorOccured = true;
      state.error.errorCode = action.payload.errorCode;
      state.error.errorMessage = action.payload.errorMessage;
    },
  },
});

export const selectError = (state) => state.error.error;
export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
