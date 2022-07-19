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
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setError } from "../feature/error/errorSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmedPassword: "",
    },
    onSubmit: (values) => {
      const { email, password, confirmedPassword } = values;
      if (password !== confirmedPassword) {
        alert("Password and Confirmed Password is not matched");
        return;
      }
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
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
            Register
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
            placeholder="Enter email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
            fullWidth
          />
          <TextField
            name="password"
            type="password"
            placeholder="Enter password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
            fullWidth
          />
          <TextField
            name="confirmedPassword"
            type="password"
            placeholder="Enter password again"
            label="Confirmed Password"
            value={formik.values.confirmedPassword}
            onChange={formik.handleChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
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
          <Link onClick={() => navigate("/login")}>
            Allready have an account? Please login.
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
