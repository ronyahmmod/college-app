import React from "react";
import Layout from "./Layout";
import { Box, Container, Avatar, Typography, Alert } from "@mui/material";
import QRCode from "react-qr-code";
import { format } from "date-fns";
import TestimonialPatternURL from "../assets/logos/testimonial-pat.jpg";
import CollegeLogoURL from "../assets/logos/college-logo.png";
import {
  renderExamination,
  renderGenderText,
  renderGroup,
  renderGroupText,
  renderResultType,
  generateQRCodeText,
} from "../helper/render.helper";
const TestimonialRenderer = ({ application, type, id }) => {
  return (
    <Layout print>
      {application && application.status === "Done" ? (
        <Box>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box
              sx={{
                width: 1200,
                height: 730,
                p: 2,
                background: `URL(${CollegeLogoURL}) rgba(0, 0, 0, .9)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "background.paper",
                backgroundSize: "60%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "background.paper",
                  opacity: 0.87,
                  px: 4,
                  py: 4,
                  fontFamily: "monospace",
                  border: "10px solid transparent",
                  borderImage: `URL(${TestimonialPatternURL})`,
                  borderImageRepeat: "round",
                  borderImageSlice: 30,
                  borderImageWidth: 2,
                  borderRadius: 3,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                    <Box>
                      <Avatar src={CollegeLogoURL} alt={CollegeLogoURL} />
                    </Box>
                    <Box sx={{ justifySelf: "center" }}>
                      <Typography
                        textAlign="center"
                        variant="h3"
                        sx={{
                          fontStyle: "italic",
                          fontFamily: "inherit",
                          color: "primary.main",
                          fontWeight: 700,
                        }}
                      >
                        Jibannagar Degree College
                      </Typography>
                      <Typography
                        textAlign="center"
                        variant="h5"
                        sx={{
                          fontStyle: "italic",
                          fontFamily: "inherit",
                        }}
                      >
                        Jibannagar, Chuadanga
                      </Typography>
                      <Typography
                        textAlign="center"
                        variant="h5"
                        sx={{ fontStyle: "italic", fontFamily: "inherit" }}
                      >
                        ESTD: 1984
                      </Typography>
                      <Typography
                        textAlign="center"
                        variant="body1"
                        sx={{ fontFamily: "inherit", mt: 1, px: 12 }}
                      >
                        EIIN: <strong>115461</strong>, NU-COLLEGE CODE: 0807,
                        JESSORE BOARD COLLEGE CODE: 115623, BM COLLEGE CODE:
                        29029, TELEPHONE: +880762475047, EMAIL:{" "}
                        <strong>jdcjibannagar@gmail.com</strong>
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, width: 160 }}>
                      <Typography variant="title" textAlign="left">
                        <Typography sx={{ textDecoration: "underline" }}>
                          Printed Date:{" "}
                        </Typography>
                        <strong>{format(Date.now(), "PP")}</strong>
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: 1,
                      mx: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Box
                        sx={{
                          backgroundColor: "primary.light",
                          p: 1,
                          borderRadius: 5,
                          color: "#fff",
                          px: 1,
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 500 }}>
                          {type.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      textAlign="justify"
                      variant="h5"
                      sx={{
                        fontStyle: "italic",
                        fontFamily: "inherit",
                        mt: 2,
                        fontSize: "22px",
                      }}
                    >
                      This is to certify that{" "}
                      <strong>{application.name.toUpperCase()}</strong>,
                      Father's Name:{" "}
                      <strong>{application.fatherName.toUpperCase()}</strong>,
                      Mother's Name:{" "}
                      <strong>{application.motherName.toUpperCase()}</strong>{" "}
                      was a student of this college in the session:{" "}
                      <strong>
                        {application.session ? application.session : "N/A"}
                      </strong>
                      . {renderGenderText(application.gender, false)} took part
                      in{" "}
                      <strong>
                        {renderExamination(application.lastExamName)}
                      </strong>{" "}
                      examination in the year{" "}
                      <strong>{application.passingYear}</strong> from{" "}
                      <strong>{renderGroup(application.group)}</strong>{" "}
                      {renderGroupText(application.group)} and passed obtaining{" "}
                      <strong>{application.result}</strong>{" "}
                      {renderResultType(application.resultType)}.{" "}
                      {renderGenderText(application.gender, false)} bears the
                      roll number: <strong>{application.roll}</strong> and
                      registration number:{" "}
                      <strong>{application.registration}</strong>.{" "}
                      {renderGenderText(application.gender)} was very well
                      behaved. {renderGenderText(application.gender, false)} did
                      not take part in any activity subversive of the state or
                      of discipline.
                      <Box sx={{ mb: 1.5 }} />I wish{" "}
                      {renderGenderText(application.gender, true)} every success
                      in life.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Box sx={{ height: 30 }}>
                        <QRCode
                          value={generateQRCodeText(application)}
                          size={120}
                          title={type.toUpperCase()}
                        />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontStyle: "italic",
                          fontFamily: "inherit",
                          mt: 2,
                          textAlign: "center",
                        }}
                      >
                        Principal <br />
                        Jibannagar Degree College
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 4,
                        textAlign: "center",
                        textDecoration: "underline",
                      }}
                    >
                      This document is generated on digitally.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      ) : (
        <Alert severity="error">
          Application {id} is wrong. Please try again
        </Alert>
      )}
    </Layout>
  );
};

export default TestimonialRenderer;
