import { Button, Typography, MobileStepper, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./FirstLoginParent.css";
import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AboutYouStepperOne from "./aboutYouStepperOne/AboutYouStepperOne.tsx";
import AboutYourChildrenStepperTwo from "./aboutYourChildrenStepperTwo/AboutYourChildrenStepperTwo.tsx";
import ChildSupportStepperThree from "./childSupportStepperThree/ChildSupportStepperThree.tsx";
import TeachingGoalsStepperFour from "./teachingGoalsStepperFour/TeachingGoalsStepperFour.tsx";

export const ChildData = React.createContext({});

function FirstLoginParent() {
  const { t } = useTranslation();

  /* Dependencies for stepper component */
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 4;

  const handleStepperNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepperBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  /* Dependencies for stepper component */

  /* Stepper component dependencies */
  const stepperComponent = () => {
    return (
      <div className="StepperContainer">
        <div className="StepperBackButton">
          {activeStep > 0 && (
            <>
              <IconButton
                onClick={handleStepperBack}
                sx={{
                  ml: 1,
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "transparent",
                  },
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <Typography>Back</Typography>
            </>
          )}
        </div>
        <div className="MainStepper">
          <MobileStepper
            className="MobileStepper"
            variant="progress"
            steps={totalSteps}
            position="static"
            activeStep={activeStep}
            nextButton={<></>}
            backButton={<></>}
          />
          <div className="StepperNoInfo">
            {activeStep + 1} of {totalSteps}
          </div>
        </div>
      </div>
    );
  };
  /* Stepper component dependencies */

  return (
    <div className="FirstLoginParent">
      <div className="Wrapper">
        {stepperComponent()}
        {activeStep === 0 && (
          <>
            <AboutYouStepperOne />
          </>
        )}
        {activeStep === 1 && (
          <>
            <AboutYourChildrenStepperTwo />
          </>
        )}
        {activeStep === 2 && (
          <>
            <ChildSupportStepperThree />
          </>
        )}
        {activeStep === 3 && (
          <>
            <TeachingGoalsStepperFour />
          </>
        )}
        <Button
          className="Button"
          variant="contained"
          fullWidth
          color="secondary"
          onClick={handleStepperNext}
          disabled={activeStep === 3}
        >
          {t("FirstLoginParent.next")}
        </Button>
      </div>
    </div>
  );
}

export default FirstLoginParent;
