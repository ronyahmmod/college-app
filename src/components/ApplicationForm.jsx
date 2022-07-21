import React from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { useTheme } from "@mui/material/styles";
import Title from "../components/Title";

const ApplicationForm = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const theme = useTheme();
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {loggedInUser && (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                  component="form"
                >
                  <Title>Create New Application</Title>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: 2,
                        }}
                      >
                        <TextField
                          name="roll"
                          type="text"
                          placeholder="Place your final exam roll number"
                          label="Exam Roll"
                          fullWidth
                          required
                        />
                        <TextField
                          name="registration"
                          type="text"
                          placeholder="Place your final exam registration number"
                          label="Exam Registration"
                          fullWidth
                          required
                        />
                        <TextField
                          name="board"
                          type="text"
                          placeholder="Place your board name"
                          label="Exam board"
                          fullWidth
                          required
                        />
                        <FormControl fullWidth>
                          <InputLabel id="board-name">Board</InputLabel>
                          <Select labelId="board-name" label="Board">
                            <MenuItem value="jessore">Jessore</MenuItem>
                            <MenuItem value="dhaka">Dhaka</MenuItem>
                            <MenuItem value="technical">Technical</MenuItem>
                            <MenuItem value="comilla">Comilla</MenuItem>
                            <MenuItem value="rajshahi">Rajshahi</MenuItem>
                            <MenuItem value="chittagong">Chittagong</MenuItem>
                            <MenuItem value="barisal">Barisal</MenuItem>
                            <MenuItem value="sylhet">Sylhet</MenuItem>
                            <MenuItem value="dinajpur">Dinajpur</MenuItem>
                            <MenuItem value="Madrasa">Madrasa</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: 2,
                        }}
                      >
                        <Alert severity="info">
                          Please attach last exam admit card.
                        </Alert>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            backgroundColor: theme.palette.grey[100],
                            p: 2,
                            borderRadius: 2,
                          }}
                        >
                          <Typography>
                            Upload your last examination admit card.
                          </Typography>
                          <Button variant="contained" component="label">
                            Upload
                            <input type="file" hidden accept="image/*" />
                          </Button>
                        </Box>
                        <Stack spacing={2} direction="row">
                          <Button variant="contained" type="submit">
                            Submit
                          </Button>
                          <Button
                            variant="contained"
                            type="reset"
                            color="error"
                          >
                            Cancle
                          </Button>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default ApplicationForm;
