import React from "react";
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setError } from "../feature/error/errorSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          dispatch(setError({ errorCode, errorMessage }));
        });
      resetForm();
    },
  });
  return (
    <Box
      sx={{
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
          height: "auto",
          minWidth: 360,
          display: "flex",
          flexDirection: "column",
          minHeight: 400,
          alignItems: "center",
          p: 2,
          borderRadius: 2,
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LockIcon
            sx={{
              height: 48,
              width: 48,
              color: "primary.main",
            }}
          />
          <Typography variant="h4" color="primary">
            Login
          </Typography>
        </Box>

        <Box
          component="form"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
            mt: 2,
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            name="email"
            type="email"
            placeholder="Enter login email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
            fullWidth
          />
          <TextField
            name="password"
            type="password"
            placeholder="Enter login password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              signInWithPopup(auth, provider)
                .then((result) => {
                  setTimeout(() => {
                    navigate("/dashboard");
                  }, 1000);
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  dispatch(setError({ errorCode, errorMessage }));
                });
            }}
          >
            Login with G-mail{" "}
            <Divider
              orientation="vertical"
              sx={{ borderColor: "inherit", mx: 1 }}
              flexItem
            />{" "}
            <GoogleIcon />
          </Button>
        </Box>

        <Box sx={{ width: "100%", mt: 2 }}>
          <Divider />
        </Box>

        <Box
          sx={{
            display: "flex",
            mt: 2,
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            a: {
              cursor: "pointer",
            },
          }}
        >
          <Link onClick={() => navigate("/register")}>
            Don't have an account? Please register.
          </Link>
          <Link>Forgot my password.</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
