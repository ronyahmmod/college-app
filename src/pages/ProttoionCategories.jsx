import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Box,
  Alert,
} from "@mui/material";
import React from "react";
import Layout from "../components/Layout";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const ProttoionCategories = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Container maxWidth="md" sx={{ mx: "auto", mt: 4, mb: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Paper
              sx={{
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Alert severity="warning" sx={{ color: grey[700], mb: 3 }}>
                  {" "}
                  যারা ইতোমধ্যে এই কলেজ থেকে পাস করেছেন তারা ১ নম্বর মেনু, যারা
                  বর্তমানে অত্র কলেজে পড়ছেন তারা ২ নম্বর মেনু এবং যারা সংশোধনের
                  জন্য আবেদন করবেন তার ৩ নম্বর মেনু নির্বাচন করবেন।{" "}
                </Alert>
                <Stack sx={{ py: 2, flex: 1 }} spacing={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    sx={{ justifyContent: "flex-start" }}
                    onClick={() => navigate("/dashboard/prottoionforpassed")}
                  >
                    1. For already passed from this college
                  </Button>
                  <Button
                    color="secondary"
                    variant="outlined"
                    size="large"
                    sx={{ justifyContent: "flex-start" }}
                  >
                    2. For currennt students
                  </Button>
                  <Button
                    color="warning"
                    variant="contained"
                    size="large"
                    sx={{ justifyContent: "flex-start" }}
                  >
                    3. For corrections
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProttoionCategories;
