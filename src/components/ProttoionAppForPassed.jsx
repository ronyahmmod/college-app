import React from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Layout from "./Layout";
import { grey } from "@mui/material/colors";
import Title from "./Title";

const ProttoionAppForPassed = () => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mx: "auto", mt: 4, mb: 2 }}>
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
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Alert severity="warning" sx={{ color: grey[700], mb: 3 }}>
                  আবেদন করার পূর্বে অবশ্যই সকল তথ্য যাচাই-বাছাই করে নিবেন। সকল
                  তথ্য সর্বশেষ পরীক্ষার তথ্য অনুযায়ী হতে হবে। একবার আবেদন সাবমিট
                  হয়ে গেলে পরিবর্তনের সুযোগ নেই। ভুল তথ্যের জন্য আপনার আবেদনটি
                  বাতিল করা হবে।
                </Alert>
                <Title sx={{ alignSelef: "flex-start" }}>
                  Application for allready passed from this college.
                </Title>
                <Grid
                  container
                  sx={{ py: 2, flex: 1, px: 2 }}
                  spacing={2}
                  component="form"
                >
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: 2,
                      }}
                    >
                      <TextField
                        name="name"
                        placeholder="Place your full name"
                        label="Students name"
                        required
                        fullWidth
                      />
                      <TextField
                        name="fatherName"
                        placeholder="Place your father's name"
                        label="Student father's name"
                        required
                        fullWidth
                      />
                      <TextField
                        name="motherName"
                        placeholder="Place your father's name"
                        label="Student father's name"
                        required
                        fullWidth
                      />
                      <FormControl fullWidth required>
                        <InputLabel id="gender">Gender</InputLabel>
                        <Select
                          labelId="gender"
                          label="Gender"
                          name="gender"
                          required
                        >
                          <MenuItem value="male">MALE</MenuItem>
                          <MenuItem value="female">FEMALE</MenuItem>
                          <MenuItem value="other">OTHER</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        name="classRoll"
                        placeholder="Place your class roll"
                        label="Class roll"
                        required
                        fullWidth
                      />
                      <FormControl fullWidth required>
                        <InputLabel id="last-exam">Last Exam Name</InputLabel>
                        <Select
                          labelId="last-exam"
                          label="Last Exam Name"
                          name="lastExamName"
                          required
                        >
                          {/* <MenuItem value="ssc">SSC</MenuItem> */}
                          <MenuItem value="hsc">HSC</MenuItem>
                          <MenuItem value="degree">DEGREE</MenuItem>
                          <MenuItem value="honours">HONOURS</MenuItem>
                          <MenuItem value="bm">HSC BM</MenuItem>
                          <MenuItem value="bou">OPEN UNIVERSITY</MenuItem>
                        </Select>
                      </FormControl>
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
                        name="passingYear"
                        type="text"
                        placeholder="Place your passing year"
                        label="Exam year"
                        fullWidth
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: 2,
                      }}
                    >
                      <TextField
                        name="session"
                        type="text"
                        placeholder="Place your session"
                        label="Exam session"
                        fullWidth
                        required
                      />
                      <FormControl fullWidth required>
                        <InputLabel id="group">
                          Last Group/Subject/Trade
                        </InputLabel>
                        <Select
                          labelId="group"
                          label="Last Group/Subject/Trade Name"
                          name="group"
                          required
                        >
                          <MenuItem value="sc">SCIENCE</MenuItem>
                          <MenuItem value="hu">HUMANITIES</MenuItem>
                          <MenuItem value="bs">BUSINESS STUDIES</MenuItem>
                          <MenuItem value="ba">BA</MenuItem>
                          <MenuItem value="bss">BSS</MenuItem>
                          <MenuItem value="bbs">BBS</MenuItem>
                          <MenuItem value="pol">POLITICAL SCIENCE</MenuItem>
                          <MenuItem value="ban">BANGLA</MenuItem>
                          <MenuItem value="hrm">
                            HUMAN RESOURCE MANAGEMENT
                          </MenuItem>
                          <MenuItem value="co">COMPUTER OPERATION</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth required>
                        <InputLabel id="board-name">Board</InputLabel>
                        <Select
                          labelId="board-name"
                          label="Board"
                          name="board"
                          required
                        >
                          <MenuItem value="jessore">Jessore</MenuItem>
                          <MenuItem value="dhaka">Dhaka</MenuItem>
                          <MenuItem value="technical">Technical</MenuItem>
                          <MenuItem value="comilla">Comilla</MenuItem>
                          <MenuItem value="rajshahi">Rajshahi</MenuItem>
                          <MenuItem value="chittagong">Chittagong</MenuItem>
                          <MenuItem value="barisal">Barisal</MenuItem>
                          <MenuItem value="sylhet">Sylhet</MenuItem>
                          <MenuItem value="dinajpur">Dinajpur</MenuItem>
                          <MenuItem value="madrasa">Madrasa</MenuItem>
                          <MenuItem value="national">
                            National University
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel id="result-type">Result Type</InputLabel>
                        <Select
                          labelId="result-type"
                          label="Result Type"
                          name="resultType"
                          required
                        >
                          <MenuItem value="cgpaOfFour">
                            CGPA (out of 4)
                          </MenuItem>
                          <MenuItem value="gpaOfFive">GPA (out of 5)</MenuItem>
                          <MenuItem value="class">CLASS</MenuItem>
                          <MenuItem value="division">DIVISION</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        name="mobile"
                        type="text"
                        required
                        label="Current Mobile Number"
                        placeholder="Enter your current mobile number"
                        fullWidth
                      />
                      <TextField
                        name="address"
                        type="text"
                        required
                        multiline
                        rows={4}
                        label="Pressent address"
                        placeholder="Enter your present address with this format: [Village, Post Office, UP/Thana, Pouro/City/Metro, District]"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProttoionAppForPassed;
