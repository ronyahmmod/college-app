import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
  },
  reducers: {
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
  },
});

export const selectLoggedInUser = (state) => state.user.loggedInUser;

export const { setLoggedInUser } = userSlice.actions;
export default userSlice.reducer;
