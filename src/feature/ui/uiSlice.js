import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  certType: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setCertType: (state, action) => {
      state.certType = action.payload.certType;
    },
  },
});

export const { setCertType } = uiSlice.actions;
export const selectCertType = (state) => state.ui.certType;
export default uiSlice.reducer;
