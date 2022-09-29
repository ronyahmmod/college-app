import React, { useState } from "react";
import { Container, Box, Stepper, Step, StepLabel, Paper } from "@mui/material";
import PersonalDetails from "./PersonalDetails";
import AcademicInformation from "./AcademicInformation";
import AttachFiles from "./AttachFiles";
import SaveAndSend from "./PreviewAndSend";
import Layout from "../../components/Layout";
import { Form, Formik } from "formik";
import { Constrains } from "./Types";

const steps = [
  "Personal Details",
  "Academic Information",
  "Attach Files",
  "Preview and Send",
];

const renderComponent = (
  steps,
  handleNext,
  handleBack,
  handleChange,
  values,
  handleApplicantPhoto,
  photo,
  imgSrc,
  handleRemoveApplicantPhoto
) => {
  switch (steps) {
    case 0: {
      return (
        <PersonalDetails
          handleNext={handleNext}
          handleBack={handleBack}
          handleChange={handleChange}
          values={values}
        />
      );
    }
    case 1: {
      return (
        <AcademicInformation
          handleNext={handleNext}
          handleBack={handleBack}
          handleChange={handleChange}
          values={values}
        />
      );
    }

    case 2: {
      return (
        <AttachFiles
          handleNext={handleNext}
          handleBack={handleBack}
          handleChange={handleChange}
          values={values}
          handleApplicantPhoto={handleApplicantPhoto}
          photo={photo}
          imgSrc={imgSrc}
          handleRemoveApplicantPhoto={handleRemoveApplicantPhoto}
        />
      );
    }
    case 3: {
      return (
        <SaveAndSend
          handleNext={handleNext}
          handleBack={handleBack}
          handleChange={handleChange}
          values={values}
          imgSrc={imgSrc}
        />
      );
    }
    default:
  }
};
const initialValues = {
  name: "",
  fatherName: "",
  motherName: "",
  gender: "",
  presentAddress: "",
  permanentAddress: "",
  mobileNumber: "",
  altMobileNumber: "",
  presentClass: Constrains.presentClass.HSC,
  presentClassRoll: "",
  presentGroup: Constrains.group.HUMANITIES,
  presentSession: "",
  presentAcademicYear: Constrains.academicYear.XI,
  lastExamClass: Constrains.presentClass.HSC,
  lastExamRoll: "",
  lastExamRegistration: "",
  lastExamYear: "",
  lastExamGroup: Constrains.group.HUMANITIES,
  lastExamBoard: Constrains.board.JESSORE,
  lastExamResultType: Constrains.resultType.GPA_OUT_OF_FIVE,
  lastExamResult: "",
  isReading: false,
  isPassed: false,
  examinations: [
    {
      name: "",
      roll: "",
      registration: "",
      year: "",
      board: "",
      group: "",
      resultType: "",
      result: "",
    },
  ],
};

const NewApplicationV2 = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleApplicantPhoto = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        const height = this.height;
        const width = this.width;
        if (height > 150 || width > 120) {
          alert("Height and width must be (150px x 120px)");
          return;
        }
        setImgSrc(image.src);

        setPhoto(event.target.files[0]);
      };
    };
  };

  const handleRemoveApplicantPhoto = () => {
    setImgSrc(null);
    setPhoto(null);
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <Box sx={{ maxWidth: "100%" }}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              alert(JSON.stringify(values));
            }}
          >
            {({ values, handleChange }) => (
              <Form noValidate autoComplete="off">
                <Paper sx={{ padding: 2, boxShadow: 1 }}>
                  <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                      return (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>

                  <Box sx={{ p: 1, mt: 1 }}>
                    {renderComponent(
                      activeStep,
                      handleNext,
                      handleBack,
                      handleChange,
                      values,
                      handleApplicantPhoto,
                      photo,
                      imgSrc,

                      handleRemoveApplicantPhoto
                    )}
                  </Box>
                </Paper>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Layout>
  );
};

export default NewApplicationV2;
