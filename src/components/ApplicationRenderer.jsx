import React, { useEffect, useState } from "react";
import { Alert, Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";
import Layout from "./Layout";
import { db } from "../firebase.config";
import {
  renderApplicationType,
  renderExamination,
  renderGroup,
  up,
} from "../helper/render.helper";
import CollegeLogoURL from "../assets/logos/college-logo.png";

function renderAppSalutation(application) {
  let renderText = "";
  if (application.applicationType === "certificate") {
    renderText = `I am ${up(
      application.name
    )}. I am humbly requested to issue the ${up(
      renderExamination(application.lastExamName)
    )} certificate bassed on the following information.`;
  } else if (application.applicationType === "testimonial") {
    renderText = `I am ${up(
      application.name
    )}. I am humbly requested to issue the ${up(
      renderExamination(application.lastExamName)
    )} testimonial bassed on the following information.`;
  } else if (application.applicationType === "certificate-testimonial") {
    renderText = `I am ${up(
      application.name
    )}. I am humbly requested to issue the ${up(
      renderExamination(application.lastExamName)
    )} testimonial && certificate bassed on the following information.`;
  } else if (
    application.applicationType === "psps" ||
    application.applicationType === "pscs" ||
    application.applicationType === "psis"
  ) {
    renderText = `I am ${up(
      application.name
    )}. I am humbly requested to issue prottoion sonod bassed on the following information.`;
  }
  return renderText;
}

function renderEdu(type, app) {
  if (type === "psis" || type === "pscs") {
    return (
      <>
        <Grid item sm={6}>
          <Box>
            <Typography>
              Class: <i>{up(app.readingClass)}</i>
            </Typography>
            <Typography>
              Group: <i>{renderGroup(app.group)}</i>
            </Typography>
            <Typography>
              Class roll: <i>{app.classRoll}</i>
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={6}>
          <Box>
            <Typography>
              Accademic year: <i>{up(app.readingYear)}</i>
            </Typography>
            <Typography>
              Session: <i>{up(app.session)}</i>
            </Typography>
          </Box>
        </Grid>
      </>
    );
  } else if (type === "psps") {
    return (
      <>
        <Grid item sm={6}>
          <Box>
            <Typography>
              Class: <i>{up(app.readingClass)}</i>
            </Typography>
            <Typography>
              Group: <i>{renderGroup(app.group)}</i>
            </Typography>
            <Typography>
              Class roll: <i>{app.classRoll}</i>
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={6}>
          <Box>
            <Typography>
              Accademic year: <i>{up(app.readingYear)}</i>
            </Typography>
            <Typography>
              Session: <i>{up(app.session)}</i>
            </Typography>
          </Box>
        </Grid>
      </>
    );
  }
}

const ApplicationRenderer = () => {
  const params = useParams();
  const id = params.id;
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);
  console.log(application);
  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, "applications", id);
        const application = await getDoc(docRef);
        setApplication({ id: application.id, ...application.data() });
        setError(null);
      } catch (error) {
        setApplication(null);
        setError(error);
      }
    }

    loadData();
  }, [id]);
  return (
    <Layout print>
      {error && <Alert severity="error">Error occured.</Alert>}
      {application && (
        <Container maxWidth="lg" sx={{ my: 3 }}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Box
                sx={{
                  width: "750px",
                  backgroundColor: "background.paper",
                  py: 2,
                  px: 4,
                }}
              >
                {/* HEADING INFORMATION */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderBottom: "4px solid #000",
                    paddingBottom: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar src={CollegeLogoURL} alt={CollegeLogoURL} />
                  </Box>
                  <Typography variant="h5" textTransform="uppercase">
                    APPLICATION FORM FOR{" "}
                    {renderApplicationType(application.applicationType)}
                  </Typography>
                  <Typography variant="title">
                    Jibannagar Degree College
                  </Typography>
                  <Typography variant="title">
                    Jibannagar, Chuadanga.
                  </Typography>
                  <Typography variant="body2" textAlign="center">
                    Web: jibannagardegreecollege.com, Email:
                    jdcjibannagar@gmail.com, EIIN: 115461, Phone: 07624-75047
                  </Typography>
                </Box>
                {/* Application Initializer Text */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    my: 2,
                  }}
                >
                  <b>{format(new Date(), "PP")}</b>
                  <span>Dear sir,</span>
                  <Typography variant="body" textAlign="justify">
                    {renderAppSalutation(application)}
                  </Typography>
                </Box>

                {/* BASIC INFORMATION */}
                <Box sx={{ my: 1.5 }}>
                  <Box
                    sx={{
                      backgroundColor: "#333",
                      color: "#f3f3f3",
                      width: "30%",
                      display: "flex",
                      p: 1,
                    }}
                  >
                    Personal Information
                  </Box>
                  <Box sx={{ border: "1px solid #000", p: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item sm={6}>
                        <Box>
                          <Typography>
                            Name: <i>{up(application.name)}</i>
                          </Typography>
                          <Typography>
                            Mother name: <i>{up(application.motherName)}</i>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item sm={6}>
                        <Box>
                          <Typography>
                            Father name: <i>{up(application.fatherName)}</i>
                          </Typography>
                          <Typography>
                            Gender: <i>{up(application.gender)}</i>
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                {/* EDUCATIONAL INFORMATION */}
                <Box sx={{ my: 1 }}>
                  <Box
                    sx={{
                      backgroundColor: "#333",
                      color: "#f3f3f3",
                      width: "30%",
                      display: "flex",
                      p: 1,
                    }}
                  >
                    Educational information
                  </Box>
                  <Box sx={{ border: "1px solid #000", p: 1 }}>
                    <Grid container spacing={2}>
                      {application.applicationType === "certificate" ||
                      application.applicationType === "testimonial" ||
                      application.applicationType ===
                        "certificate-testimonial" ? (
                        <>
                          <Grid item sm={6}>
                            <Box>
                              <Typography>
                                Examination name:{" "}
                                <i>{up(application.lastExamName)}</i>
                              </Typography>
                              <Typography>
                                Registration: <i>{application.registration}</i>
                              </Typography>
                              <Typography>
                                Session: <i>{application.session}</i>
                              </Typography>
                              <Typography>
                                Group:{" "}
                                <i>{up(renderGroup(application.group))}</i>
                              </Typography>
                              <Typography>
                                Class roll: <i>{application.classRoll}</i>
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item sm={6}>
                            <Box>
                              <Typography>
                                Roll: <i>{application.roll}</i>
                              </Typography>
                              <Typography>
                                Passing year: <i>{application.passingYear}</i>
                              </Typography>
                              <Typography>
                                Board/University: <i>{up(application.board)}</i>
                              </Typography>
                              <Typography>
                                Result: <i>{application.result}</i>
                              </Typography>
                            </Box>
                          </Grid>
                        </>
                      ) : (
                        <>
                          {renderEdu(application.applicationType, application)}
                        </>
                      )}
                    </Grid>
                  </Box>
                </Box>
                {/* END EDU */}

                {/* CORRECTION INFO */}

                {application.applicationType === "psis" && (
                  <Box sx={{ my: 1 }}>
                    <Box
                      sx={{
                        backgroundColor: "#333",
                        color: "#f3f3f3",
                        width: "30%",
                        display: "flex",
                        p: 1,
                      }}
                    >
                      Correction information
                    </Box>
                    <Box sx={{ border: "1px solid #000", p: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item sm={6}>
                          <Box>
                            {application.nameChanged && (
                              <Typography>
                                Previous name: <i>{up(application.name)}</i>
                              </Typography>
                            )}
                            {application.fatherNameChanged && (
                              <Typography>
                                Previous Father name:{" "}
                                <i>{up(application.fatherName)}</i>
                              </Typography>
                            )}
                            {application.motherNameChagned && (
                              <Typography>
                                Previous Mother name:{" "}
                                <i>{up(application.motherName)}</i>
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                        <Grid item sm={6}>
                          <Box>
                            {application.nameChanged && (
                              <Typography>
                                Corrected name:{" "}
                                <i>{up(application.changedName)}</i>
                              </Typography>
                            )}
                            {application.fatherNameChanged && (
                              <Typography>
                                Corrected Father name:{" "}
                                <i>{up(application.changedFatherName)}</i>
                              </Typography>
                            )}
                            {application.motherNameChagned && (
                              <Typography>
                                Corrected Mother name:{" "}
                                <i>{up(application.changedMotherName)}</i>
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )}

                {/* END CORRECTION */}

                {/* CONTACT */}
                <Box sx={{ my: 1 }}>
                  <Box
                    sx={{
                      backgroundColor: "#333",
                      color: "#f3f3f3",
                      width: "30%",
                      display: "flex",
                      p: 1,
                    }}
                  >
                    Contact information
                  </Box>
                  <Box sx={{ border: "1px solid #000", p: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item sm={12}>
                        <Box>
                          <Typography>
                            <span>Mobile number:</span>{" "}
                            <i>{application.mobile}</i>
                          </Typography>
                          <Typography>
                            <span>Address:</span>{" "}
                            <i>{up(application.address)}</i>
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                {/* END CONTACT */}

                {/* Footer */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                  }}
                >
                  <Box>
                    <Typography>
                      <i>Your sincerely</i>
                    </Typography>
                    <Typography>({application.name})</Typography>
                  </Box>
                  <Box>
                    <Typography>
                      <i>Issued by</i>
                    </Typography>
                    <Typography>(OFFICE STAFF)</Typography>
                  </Box>
                  <Box>
                    <Typography>
                      <i>Approved by</i>
                    </Typography>
                    <Typography>(PRINCIPAL)</Typography>
                  </Box>
                </Box>

                {/* END FOOTER */}
                {/* PAY */}
                <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
                  <Typography
                    variant="title"
                    textAlign="center"
                    sx={{ width: "100%", fontWeight: "bold" }}
                  >
                    You have to pay {application.fee ? application.fee : "NA"}{" "}
                    BDT to account office of Jibannagar Degree College.
                  </Typography>
                </Box>

                {/* END PAY */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </Layout>
  );
};

export default ApplicationRenderer;
