import React from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
} from "@mui/material";
import {
  renderGender,
  renderPresentClass,
  renderPresentGroup,
  renderAcademicYear,
} from "../../helper/render.helper";

const Field = ({ label, data }) => (
  <TableRow>
    <TableCell>{label}</TableCell>
    <TableCell>
      <Typography variant="body1" textTransform="uppercase">
        {data}
      </Typography>
    </TableCell>
  </TableRow>
);

const SaveAndSend = ({ handleNext, handleBack, values, imgSrc }) => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          src={imgSrc}
          alt="Student Photo"
          sx={{ height: 150, width: 150 }}
        />
      </Box>
      <Grid container spacing={4} sx={{ my: 2 }}>
        <Grid item sm={12}>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ textDecoration: "underline", color: "#410000" }}
          >
            Personal Details
          </Typography>
          <Table>
            <TableBody>
              <Field label="Students Name" data={values.name} />
              <Field label="Father Name" data={values.fatherName} />
              <Field label="Mother Name" data={values.motherName} />
              <Field label="Gender" data={renderGender(values.gender)} />
              <Field label="Present Address" data={values.presentAddress} />
              <Field label="permanent Address" data={values.permanentAddress} />
              <Field label="Mobile Number" data={values.mobileNumber} />
              <Field
                label="Alternative Mobile Number"
                data={values.altMobileNumber}
              />
            </TableBody>
          </Table>
        </Grid>
        {values.isReading && (
          <Grid item sm={12}>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ textDecoration: "underline", color: "#410000" }}
            >
              Present Accademic Information
            </Typography>
            <Table>
              <TableBody>
                <Field
                  label="Class Name"
                  data={renderPresentClass(values.presentClass)}
                />
                <Field label="Roll" data={values.presentClassRoll} />
                <Field
                  label="Group"
                  data={renderPresentGroup(values.presentGroup)}
                />
                <Field label="Session" data={values.presentSession} />
                <Field
                  label="Academic Year"
                  data={renderAcademicYear(values.presentAcademicYear)}
                />
              </TableBody>
            </Table>
          </Grid>
        )}

        {values.isPassed && values.examinations.length > 0 && (
          <Grid item sm={12}>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ textDecoration: "underline", color: "#410000" }}
            >
              Examination Information
            </Typography>
            {values.examinations.map((examination, index) => (
              <Table key={index}>
                <caption>
                  Information about {renderPresentClass(examination.name)}
                </caption>
                <TableBody>
                  <Field
                    label="Exam Name"
                    data={renderPresentClass(examination.name)}
                  />
                  <Field label="Roll" data={examination.roll} />
                  <Field
                    label="Group"
                    data={renderPresentGroup(values.presentGroup)}
                  />
                  <Field label="Session" data={values.presentSession} />
                  <Field
                    label="Academic Year"
                    data={renderAcademicYear(values.presentAcademicYear)}
                  />
                </TableBody>
              </Table>
            ))}
          </Grid>
        )}
      </Grid>
      <Box>
        <Button onClick={handleNext}>Next</Button>{" "}
        <Button onClick={handleBack}>Back</Button>
      </Box>
    </Box>
  );
};

export default SaveAndSend;
