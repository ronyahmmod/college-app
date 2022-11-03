import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { format } from "date-fns";
// import { getMilliseconds, toDate } from "date-fns";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase.config";

export const fetchApplications = createAsyncThunk(
  "application/fetchApplications",
  async () => {
    const applicationsRef = collection(db, "applications");
    const querySnapshot = await getDocs(
      query(applicationsRef, orderBy("date", "desc"))
    );
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
// export const selectApplicationsByUserId = (id) => (state) =>
//   state.application.applications.filter((app) => app.studentId === id);
export const selectApplicationById = (id) => (state) =>
  state.application.applications.filter((app) => app.id === id);
export const selectApplicationByPayslip = (payslip) => {
  return (state) =>
    state.application.applications.filter((app) => app.payslip === payslip);
};

// sorted applications by application date
export const selectSortedApplicationByAppDate = (state) =>
  state.application.applications;
export const selectApplicationsByUserId = (id) =>
  createSelector(selectAllApplications, (applications) =>
    applications.filter((app) => app.studentId === id)
  );

export const selectTodaysApplications = createSelector(
  selectSortedApplicationByAppDate,
  (applications) =>
    applications.filter(
      (app) =>
        format(new Date(app.date), "yyyy-MM-dd") ===
        format(new Date(), "yyyy-MM-dd")
    )
);

export const selectTodaysApplicationsByUserId = (id) =>
  createSelector(selectTodaysApplications, (applications) =>
    applications.filter((app) => app.studentId === id)
  );

export const { setStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
