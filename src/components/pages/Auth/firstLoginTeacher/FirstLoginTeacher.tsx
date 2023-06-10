import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  MobileStepper,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./FirstLoginTeacher.css";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks/redux-hooks.ts";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AboutYouStepperOne from "./aboutYouStepperOne/AboutYouStepperOne.tsx";
import AboutYourRoleStepperTwo from "./aboutYourRoleStepperTwo/AboutYourRoleStepperTwo.tsx";
import SubjectInterestsStepperThree from "./subjectInterestsStepperThree/SubjectInterestsStepperThree.tsx";
import StudentsGradeStepperFour from "./studentsGradeStepperFour/StudentsGradeStepperFour.tsx";
import SchoolStepperFive from "./schoolStepperFive/SchoolStepperFive.tsx";

export const ChildData = React.createContext({});

function FirstLoginTeacher() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  /* Routing, navigation and param dependencies */
  const navigate = useNavigate();
  const params = useParams();
  /* Routing, navigation and param dependencies */

  const [signUpRole, setSignUpRole] = useState<string | undefined>("");
  const { role } = params;

  /* Dependencies for stepper component */
  const [activeStep, setActiveStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(5);

  const handleStepperNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepperBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  /* Dependencies for stepper component */

  useEffect(() => {
    setSignUpRole(role);
  }, [navigate]);


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
        {activeStep === 2 && (
          <>
          <SubjectInterestsStepperThree/>
          </>
        )}
        {activeStep === 3 && (
          <>
          <StudentsGradeStepperFour/>
          </>
        )}
        {activeStep === 4 && (
          <>
          <SchoolStepperFive/>
          </>
        )}
        <Button
          className="Button"
          variant="contained"
          fullWidth
          color="secondary"
          onClick={handleStepperNext}
        >
          {activeStep === 4 ? t("FirstLoginTeacher.joinThisSchool") : t("FirstLoginTeacher.next")}
        </Button>
      </div>
    </div>
  );
}

export default FirstLoginTeacher;
