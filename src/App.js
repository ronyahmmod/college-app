import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import PageNotFound from "./pages/404";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "./feature/user/userSlice";
import Applications from "./pages/Applications";
import { createUser } from "./firebase/auth/auth";
import AllreadyLoggedIn from "./components/AllreadyLoggedIn";
import Render from "./pages/Render";
import RequireAuth from "./components/RequireAuth";
import Users from "./pages/Users";
import Details from "./pages/Details";
import ApplicationForm from "./pages/ApplicationForm";
import ProttoionCategories from "./pages/ProttoionCategories";
import ProttoionAppForPassed from "./pages/ProttoionAppForPassed";
import ProttoionAppForCurrent from "./pages/ProttoionAppForCurrent";
import ProttoionAppForCorrection from "./pages/ProttoionAppForCorrection";
import AuthorizeForUser from "./components/AuthorizeForUser";
import AuthorizeForAdmin from "./components/AuthorizeForAdmin";
import EditCertificateApp from "./pages/EditCertificateApp";
import EditProttoionForCorrectionApp from "./pages/EditProttoionForCorrectionApp";
import EditProttoionForCurrentApp from "./pages/EditProttoionForCurrentApp";
import EditProttoionForPassedApp from "./pages/EditProttoionForPassedApp";
import StudentRegistrationForm from "./pages/StudentRegistrationForm";
import Students from "./pages/Students";
import EditStudentForm from "./pages/EditStudentForm";
import PrintVoterList from "./pages/PrintVoterList";
import ApplicationRenderer from "./components/ApplicationRenderer";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // throw new Error("User not found");
        const newUser = {
          uid: user.uid,
          email: user.email || "Unknown",
          displayName: user.displayName || "Unknown",
          emailVerified: user.emailVerified || false,
          isAnonymous: user.isAnonymous || false,
          phoneNumber: user.phoneNumber || "Unknown",
          photoURL: user.photoURL || undefined,
          role: user.role || "user",
        };
        const savedUser = await createUser(newUser);
        dispatch(setLoggedInUser(savedUser));
      } else {
        dispatch(setLoggedInUser(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Box sx={{ backgroundColor: "inherit" }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={
            <AllreadyLoggedIn>
              <Login />
            </AllreadyLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <AllreadyLoggedIn>
              <Register />
            </AllreadyLoggedIn>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<Overview />} />
          <Route path="applications" element={<Applications />} />
          <Route
            path="newapplication"
            element={
              <AuthorizeForUser>
                <ApplicationForm />
              </AuthorizeForUser>
            }
          />
          <Route
            path="student-reg-form"
            element={
              <AuthorizeForAdmin>
                <StudentRegistrationForm />
              </AuthorizeForAdmin>
            }
          />
          <Route
            path="print-application/:id"
            element={<ApplicationRenderer />}
          />
          <Route
            path="edit-student-form/:id"
            element={
              <AuthorizeForAdmin>
                <EditStudentForm />
              </AuthorizeForAdmin>
            }
          />
          <Route
            path="print-voter-list"
            element={
              <AuthorizeForAdmin>
                <PrintVoterList />
              </AuthorizeForAdmin>
            }
          />
          <Route
            path="all-students"
            element={
              <AuthorizeForAdmin>
                <Students />
              </AuthorizeForAdmin>
            }
          />
          <Route
            path="render/:id/:type"
            element={
              <AuthorizeForAdmin>
                <Render />
              </AuthorizeForAdmin>
            }
          />
          <Route
            path="users"
            element={
              <AuthorizeForAdmin>
                <Users />
              </AuthorizeForAdmin>
            }
          />
          <Route
            path="editcertificateapp/:id"
            element={
              <AuthorizeForAdmin>
                <EditCertificateApp />
              </AuthorizeForAdmin>
            }
          />
          <Route
            path="editprottoionforcorrectionapp/:id"
            element={
              <AuthorizeForAdmin>
                <EditProttoionForCorrectionApp />
              </AuthorizeForAdmin>
            }
          />
          <Route
            path="editprottoionforcurrentapp/:id"
            element={
              <AuthorizeForAdmin>
                <EditProttoionForCurrentApp />
              </AuthorizeForAdmin>
            }
          />
          <Route
            path="editprottoionforpassedapp/:id"
            element={
              <AuthorizeForAdmin>
                <EditProttoionForPassedApp />
              </AuthorizeForAdmin>
            }
          />
          <Route path="details" element={<Details />} />
          <Route
            path="prottoions"
            element={
              <AuthorizeForUser>
                <ProttoionCategories />
              </AuthorizeForUser>
            }
          />
          <Route
            path="prottoionforpassed"
            element={
              <AuthorizeForUser>
                <ProttoionAppForPassed />
              </AuthorizeForUser>
            }
          />
          <Route
            path="prottoionforcurrent"
            element={
              <AuthorizeForUser>
                <ProttoionAppForCurrent />
              </AuthorizeForUser>
            }
          />
          <Route
            path="prottoionforcorrection"
            element={
              <AuthorizeForUser>
                <ProttoionAppForCorrection />
              </AuthorizeForUser>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
