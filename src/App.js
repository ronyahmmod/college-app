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

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setLoggedInUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            metadata: {
              createdAt: user.metadata.createdAt,
              creationTime: user.metadata.creationTime,
              lastLoginAt: user.metadata.lastLoginAt,
              lastSignInTime: user.metadata.lastSignInTime,
            },
          })
        );
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
