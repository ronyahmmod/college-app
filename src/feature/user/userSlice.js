import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase.config";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      createdAt: new Timestamp(doc.data().createdAt).toDate(),
      // metadata: {
      //   ...doc.metadata(),
      //   createdAt: new Date(doc.metadata("createdAt")),
      // },
    });
  });
  return data;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ uid, fieldName, fieldValue }, thunkApi) => {
    // console.log(uid, fieldValue, fieldName);
    // alert(uid);
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      [fieldName]: fieldValue,
    });
    thunkApi.dispatch(fetchUsers());
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id }, thunkApi) => {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef);
    thunkApi.dispatch(fetchUsers());
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    users: [],
    status: "idle",
    updateStatus: "idle",
    error: null,
    updateError: null,
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
      })
      .addCase(updateUser.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = "succeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const selectUserRole = createSelector(
  selectLoggedInUser,
  (loggedInUser) => loggedInUser.role
);
export const selectUserIsActivated = (state) =>
  state.user.loggedInUser.isActivated || undefined;
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
