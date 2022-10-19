import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Layout from "../components/Layout";
import Title from "../components/Title";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase.config";
import { renderGroup, up } from "../helper/render.helper";
import { Formik } from "formik";
import Group from "../components/Group";
import Classes from "../components/Classes";
import Years from "../components/Years";
import PrintIcon from "@mui/icons-material/Print";

const PrintVoterList = () => {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        if (status === "idle") {
          const studentsRef = collection(db, "students");
          let q = null;
          if (filter) {
            console.log(filter);

            q = query(
              studentsRef,
              where("class", "==", filter.class || "hsc"),
              where("group", "==", filter.group || "hu")
            );
          } else {
            q = query(studentsRef, orderBy("class", "desc"));
          }
          const querySnapshot = await getDocs(q);
          const studentsData = [];
          querySnapshot.forEach((doc) => {
            studentsData.push({ id: doc.id, ...doc.data() });
          });
          setStudents(studentsData);
          setStatus("succeded");
          setError(null);
        }
      } catch (error) {
        setError(null);
        setStatus("failed");
        setStudents(null);
      }
    }
    loadStudents();
  }, [status, filter]);

  console.log(students);
  const renderFilterForm = () => {
    return (
      <Paper sx={{ displayPrint: "none", width: 1100, my: 2, p: 2 }}>
        <Formik
          initialValues={{ class: "", group: "", readingYear: "" }}
          onSubmit={(values) => {
            setFilter(values);
            setStatus("idle");
          }}
        >
          {({ values, handleSubmit, resetForm, handleChange }) => (
            <Box
              component="form"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                p: 2,
              }}
              onSubmit={handleSubmit}
            >
              <Classes
                changeHandler={handleChange}
                value={values.class}
                required={false}
                sx={{ width: 200, flex: 1 }}
              />
              <Group
                changeHandler={handleChange}
                value={values.group}
                required={false}
                sx={{ width: 200, flex: 1 }}
              />
              <Years
                changeHandler={handleChange}
                value={values.readingYear}
                required={false}
                sx={{ width: 200, flex: 1 }}
              />
              <ButtonGroup>
                <Button type="submit" variant="contained">
                  Filter
                </Button>
                <Button
                  type="reset"
                  color="error"
                  variant="contained"
                  onClick={() => {
                    resetForm();
                    setStatus("idle");
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  endIcon={<PrintIcon />}
                  onClick={() => window.print()}
                >
                  Print
                </Button>
              </ButtonGroup>
            </Box>
          )}
        </Formik>
      </Paper>
    );
  };

  if (students.length <= 0) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, mx: "auto" }}>
          {renderFilterForm()}
          <Paper>
            <Alert severity="info">There is now students</Alert>
          </Paper>
        </Container>
      </Layout>
    );
  } else if (error) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, mx: "auto" }}>
          {renderFilterForm()}
          <Paper>
            <Alert severity="error">Error occured: {error.message}</Alert>
          </Paper>
        </Container>
      </Layout>
    );
  }
  return (
    <Layout print>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, mx: "auto" }}>
        {renderFilterForm()}
        <Box
          sx={{
            width: 1100,
            backgroundColor: "background.paper",
            p: 1,
            py: 2,
          }}
        >
          <Title textAlign="center">জীবননগর ডিগ্রি কলেজ</Title>
          <Title variant="body" textAlign="center">
            জীবননগর, চুয়াডাঙ্গা।
          </Title>
          <Title textAlign="center">ভোটার তালিকা-২০২২</Title>
          <Divider sx={{ border: "4px solid #333" }} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Voter Name</TableCell>
                <TableCell>Student's Name</TableCell>
                <TableCell>Mother Name</TableCell>
                <TableCell>Voter number</TableCell>
                <TableCell>Class, Roll and Year</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.fatherNameBan}</TableCell>
                  <TableCell>{student.studentNameBan}</TableCell>
                  <TableCell>{student.motherNameBan}</TableCell>
                  <TableCell>{up(student.voterNumber)}</TableCell>
                  <TableCell>
                    {up(student.class)}, {student.classRoll},{" "}
                    {up(student.readingYear)}
                  </TableCell>
                  <TableCell>{renderGroup(student.group)}</TableCell>
                  <TableCell>{up(student.address)} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </Layout>
  );
};

export default PrintVoterList;
