import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../firebase.config";

export const fetchApplications = createAsyncThunk(
  "application/fetchApplications",
  async () => {
    const querySnapshot = await getDocs(collection(db, "applications"));
    const data = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().payslipDate) {
        data.push({
          id: doc.id,
          ...doc.data(),
          date: new Timestamp(
            doc.data().date.seconds,
            doc.data().date.nanoseconds
          )
            .toDate()
            .toLocaleString(),
          payslipDate: new Date(doc.data().payslipDate).toLocaleString(),
        });
      } else {
        data.push({
          id: doc.id,
          ...doc.data(),
          date: new Timestamp(
            doc.data().date.seconds,
            doc.data().date.nanoseconds
          )
            .toDate()
            .toLocaleString(),
        });
      }
    });
    return data;
  }
);

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    status: "idle",
    applications: [],
    error: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchApplications.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.status = "succeded";
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllApplications = (state) => state.application.applications;
export const selectApplicationStatus = (state) => state.application.status;
export const selectApplicationError = (state) => state.application.error;
export const selectApplicationsByUserId = (id) => (state) =>
  state.application.applications.filter((app) => app.studentId === id);
export const selectApplicationById = (id) => (state) =>
  state.application.applications.filter((app) => app.id === id);
export const selectApplicationByPayslip = (payslip) => {
  return (state) =>
    state.application.applications.filter((app) => app.payslip === payslip);
};
export const { setStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
