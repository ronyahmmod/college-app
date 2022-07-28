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
import ApplicationForm from "./components/ApplicationForm";
import Render from "./pages/Render";
import RequireAuth from "./components/RequireAuth";
import Users from "./pages/Users";
import Details from "./pages/Details";
import ProttoionCategories from "./pages/ProttoionCategories";
import ProttoionAppForPassed from "./components/ProttoionAppForPassed";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const newUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          role: user.role || "user",
          metadata: {
            createdAt: user.metadata.createdAt,
            creationTime: user.metadata.creationTime,
            lastLoginAt: user.metadata.lastLoginAt,
            lastSignInTime: user.metadata.lastSignInTime,
          },
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
  });

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
          <Route path="newapplication" element={<ApplicationForm />} />
          <Route path="render/:id/:type" element={<Render />} />
          <Route path="users" element={<Users />} />
          <Route path="details" element={<Details />} />
          <Route path="prottoions" element={<ProttoionCategories />} />
          <Route
            path="prottoionforpassed"
            element={<ProttoionAppForPassed />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
