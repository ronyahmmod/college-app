import React, { useEffect, useState } from "react";
import { Alert, Button, Grid, Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Formik } from "formik";
import {
  ClassRoll,
  Gender,
  NameField,
  ClassName,
  Session,
  Group,
  AcademicYear,
  MobileNumber,
  Address,
} from "../components/Fields";
import Layout from "../components/Layout";
import Title from "../components/Title";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const EditProttoionForCurrentApp = () => {
  const params = useParams();
  const id = params.id;
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  console.log(application);
  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, "applications", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setApplication({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        setError(error);
      }
    }
    loadData();
  }, [id]);

  if (error) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ my: 3 }}>
          <Alert severity="error">Error occured.</Alert>
        </Container>
      </Layout>
    );
  }
  if (application) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ my: 3 }}>
          <Box>
            <Formik
              initialValues={{
                name: application.name,
                fatherName: application.fatherName,
                motherName: application.motherName,
                gender: application.gender,
                classRoll: application.classRoll,
                readingClass: application.readingClass,
                session: application.session,
                group: application.group,
                readingYear: application.readingYear,
                mobile: application.mobile,
                address: application.address,
              }}
              onSubmit={async (values) => {
                try {
                  setStatus("updating");
                  const docRef = doc(db, "applications", id);
                  await updateDoc(docRef, values);
                  setStatus("updated");
                } catch (error) {
                  setError(error);
                }
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Paper sx={{ p: 2 }} component="form" onSubmit={handleSubmit}>
                  {error && (
                    <Alert severity="error">{`Error occured: ${error.toString()} `}</Alert>
                  )}
                  {status === "updated" && (
                    <Alert severity="success">Update successfully.</Alert>
                  )}
                  {status === "updating" && (
                    <Alert severity="info">Please wait...</Alert>
                  )}
                  <Title>Edit your application</Title>
                  <Grid container spacing={2} sx={{ my: 2 }}>
                    {/* PART-1 */}
                    <Grid item sm={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <NameField
                          name="name"
                          label="Name"
                          value={values.name}
                          handleChange={handleChange}
                        />
                        <NameField
                          name="fatherName"
                          label="Father Name"
                          value={values.fatherName}
                          handleChange={handleChange}
                        />
                        <NameField
                          name="motherName"
                          label="Mother Name"
                          value={values.motherName}
                          handleChange={handleChange}
                        />
                        <Gender
                          name="gender"
                          handleChange={handleChange}
                          value={values.gender}
                        />
                        <ClassRoll
                          name="classRoll"
                          value={values.classRoll}
                          handleChange={handleChange}
                        />
                        <ClassName
                          name="readingClass"
                          value={values.readingClass}
                          handleChange={handleChange}
                        />
                      </Box>
                    </Grid>
                    {/* END PART-1 */}

                    {/* PART-2 */}
                    <Grid item sm={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Session
                          name="session"
                          value={values.session}
                          handleChange={handleChange}
                        />
                        <Group
                          changeHandler={handleChange}
                          value={values.group}
                        />
                        <AcademicYear
                          name="readingYear"
                          value={values.readingYear}
                          handleChange={handleChange}
                        />
                        <MobileNumber
                          name="mobile"
                          value={values.mobile}
                          handleChange={handleChange}
                        />
                        <Address
                          name="address"
                          value={values.address}
                          handleChange={handleChange}
                        />
                      </Box>
                    </Grid>
                    {/* END PART-2 */}
                  </Grid>
                  <Box>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={status === "updating"}
                    >
                      Update
                    </Button>
                  </Box>
                </Paper>
              )}
            </Formik>
          </Box>
        </Container>
      </Layout>
    );
  }
};

export default EditProttoionForCurrentApp;
