import React, { useReducer, useState } from "react";
import Layout from "../../components/Layout";
import PartOne from "./PartOne";
import PartTwo from "./PartTwo";
import PartThree from "./PartThree";
import PartFour from "./PartFour";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import ApplicationContext from "../../context/ApplicationContext";
import { Constrains } from "./Types";
import { useFormik } from "formik";
import { Box } from "@mui/material";

const steps = [
  {
    label: "ব্যক্তিগত তথ্যাদি (ইংরেজিতে পূরণীয়)",
    component: <PartOne />,
  },
  {
    label: "আবেদনের ধরণ (ইংরেজিতে পূরণীয়)",
    component: <PartTwo />,
  },
  {
    label: "প্রাতিষ্ঠানিক তথ্যাদি (ইংরেজিতে পূরণীয়)",
    component: <PartThree />,
  },
  {
    label: "ফাইল সংযুক্তকরণ (ইংরেজিতে পূরণীয়)",
    component: <PartFour />,
  },
];

const NewApplication = () => {
  // FORM DATA USE FORMIK START
  const formik = useFormik({
    initialValues: {
      name: "",
      fatherName: "",
      motherName: "",
      gender: Constrains.gender.MALE,
      presentAddress: "",
      parmanentAddress: "",
      mobileNumber: "",
      altMobileNumber: "",
      presentClass: Constrains.presentClass.HSC,
      presentClassRoll: "",
      presentGroup: Constrains.group.HUMANITIES,
      presentSession: "",
      presentAcademicYear: Constrains.academicYear.XI,
      lastExamClass: Constrains.presentClass.HSC,
      lastExamRoll: "",
      lastRegistration: "",
      lastExamYear: "",
      lastExamGroup: Constrains.group.HUMANITIES,
      lastExamBoard: Constrains.board.JESSORE,
      lastExamResultType: Constrains.resultType.GPA_OUT_OF_FIVE,
      lastExamResult: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
  // FORM DATA END
  const initialState = {
    passed: false,
    applicationTypes: [],
    reading: false,
    prottoionCategory: Constrains.prottoionCategory.GENERAL,
    correctionCategory: {
      nameCorrection: false,
      fatherNameCorrection: false,
      motherNameCorrection: false,
      ageCorrection: false,
    },
    addressIsSame: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_PASSED": {
        return {
          ...state,
          passed: action.payload.passed,
        };
      }
      case "SET_ALLREADY_READING": {
        return {
          ...state,
          reading: action.payload.reading,
        };
      }

      case "SET_APPLICATION_TYPES": {
        return {
          ...state,
          applicationTypes: action.payload.applicationTypes,
        };
      }

      case "SET_PROTTOION_CATEGORY": {
        return {
          ...state,
          prottoionCategory: action.payload.prottoionCategory,
        };
      }

      case "SET_CORRECTION_CATEGORY": {
        return {
          ...state,
          correctionCategory: {
            ...state.correctionCategory,
            [action.payload.fieldName]: action.payload.value,
          },
        };
      }

      case "SET_ADDRESS_IS_SAME": {
        return {
          ...state,
          addressIsSame: action.payload.addressIsSame,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Layout>
      {/* MOBILE VIEW */}
      <Box component="form" onSubmit={formik.handleSubmit}>
        <ApplicationContext.Provider
          value={{
            state,
            dispatch,
            formFields: formik.values,
            changeHandler: formik.handleChange,
          }}
        >
          <MobileView
            steps={steps}
            maxSteps={maxSteps}
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
          />

          {/* DESKTOP VIEW */}
          <DesktopView
            steps={steps}
            maxSteps={maxSteps}
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            handleStep={handleStep}
          />
        </ApplicationContext.Provider>
      </Box>
    </Layout>
  );
};

export default NewApplication;
