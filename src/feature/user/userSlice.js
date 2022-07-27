import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      // metadata: {
      //   ...doc.metadata(),
      //   createdAt: new Date(doc.metadata("createdAt")),
      // },
    });
  });
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const selectUserStatus = (state) => state.user.status;
export const selectAllUsers = (state) => state.user.users;
export const { setLoggedInUser, setStatus } = userSlice.actions;

export const selectUserByFieldValue = (value) =>
  createSelector(selectAllUsers, (users) =>
    users.filter((user) =>
      Object.entries(user).some((entry) =>
        String(entry[1]).toLocaleLowerCase().includes(value)
      )
    )
  );
export default userSlice.reducer;
