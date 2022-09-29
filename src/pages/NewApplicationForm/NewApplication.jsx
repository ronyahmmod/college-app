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
    formData: {
      partOne: null,
      partThree: null,
    },
    formErrors: {
      partOne: null,
      partThree: null,
    },
  };

  const reducer = (state, action) => {
    console.log(state);
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

      case "SET_FORM_PART_ONE": {
        return {
          ...state,
          formData: {
            ...state.formData,
            partOne: action.payload,
          },
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
      <Box component="form">
        <ApplicationContext.Provider
          value={{
            state,
            dispatch,
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
