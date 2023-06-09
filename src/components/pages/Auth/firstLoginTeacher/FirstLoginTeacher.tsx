import { Button, Typography, MobileStepper, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./FirstLoginTeacher.css";
import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AboutYouStepperOne from "./aboutYouStepperOne/AboutYouStepperOne.tsx";
import AboutYourRoleStepperTwo from "./aboutYourRoleStepperTwo/AboutYourRoleStepperTwo.tsx";

export const ChildData = React.createContext({});

function FirstLoginTeacher() {
  const { t } = useTranslation();

  /* Routing, navigation and param dependencies */

  /* Dependencies for stepper component */
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 7;

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
    <div className="FirstLoginTeacher">
      <div className="Wrapper">
        {stepperComponent()}
        {activeStep === 0 && (
          <>
            <AboutYouStepperOne />
          </>
        )}
        {activeStep === 1 && (
          <>
            <AboutYourRoleStepperTwo />
          </>
        )}
        {activeStep === 2 && <></>}
        {activeStep === 3 && <></>}
        <Button
          className="Button"
          variant="contained"
          fullWidth
          color="secondary"
          onClick={handleStepperNext}
          disabled={activeStep === 3}
        >
          {t("FirstLoginTeacher.next")}
        </Button>
      </div>
    </div>
  );
}

export default FirstLoginTeacher;