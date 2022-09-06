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
import ApplicationForm from "./components/ApplicationForm";
import Render from "./pages/Render";
import Users from "./pages/Users";
import Details from "./pages/Details";
import ProttoionCategories from "./pages/ProttoionCategories";
import ProttoionAppForPassed from "./components/ProttoionAppForPassed";
import ProttoionAppForCurrent from "./components/ProttoionAppForCurrent";
import ProttoionAppForCorrection from "./components/ProttoionAppForCorrection";
import Authenticate from "./components/Authenticate";
import UpdateMe from "./pages/UpdateMe";
import NewApplication from "./pages/NewApplicationForm/NewApplication";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const savedUser = await createUser(user, dispatch);
        dispatch(setLoggedInUser(savedUser));
      } else {
        dispatch(setLoggedInUser(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth, dispatch]);

  return (
    <Box sx={{ backgroundColor: "inherit" }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <Authenticate whose={["user", "super", "admin"]}>
              <Dashboard />
            </Authenticate>
          }
        >
          <Route index element={<Overview />} />
          <Route
            path="applications"
            element={
              <Authenticate whose={["user", "super", "admin"]}>
                <Applications />
              </Authenticate>
            }
          />
          <Route
            path="newapplication"
            element={
              <Authenticate whose={["user", "super"]}>
                <ApplicationForm />
              </Authenticate>
            }
          />
          <Route
            path="newapp"
            element={
              <Authenticate whose={["user", "super"]}>
                <NewApplication />
              </Authenticate>
            }
          />
          <Route
            path="render/:id/:type"
            element={
              <Authenticate whose={["admin", "super"]}>
                <Render />
              </Authenticate>
            }
          />
          <Route
            path="users"
            element={
              <Authenticate whose={["admin", "super"]}>
                <Users />
              </Authenticate>
            }
          />
          <Route
            path="details"
            element={
              <Authenticate whose={["user", "super", "admin"]}>
                <Details />
              </Authenticate>
            }
          />
          <Route
            path="prottoions"
            element={
              <Authenticate whose={["user", "super"]}>
                <ProttoionCategories />
              </Authenticate>
            }
          />
          <Route
            path="prottoionforpassed"
            element={
              <Authenticate whose={["user", "super"]}>
                <ProttoionAppForPassed />
              </Authenticate>
            }
          />
          <Route
            path="prottoionforcurrent"
            element={
              <Authenticate whose={["user", "super"]}>
                <ProttoionAppForCurrent />
              </Authenticate>
            }
          />
          <Route
            path="prottoionforcorrection"
            element={
              <Authenticate whose={["user", "super"]}>
                <ProttoionAppForCorrection />
              </Authenticate>
            }
          />
          <Route
            path="updateMe"
            element={
              <Authenticate whose={["user", "super", "admin"]}>
                <UpdateMe />
              </Authenticate>
            }
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
