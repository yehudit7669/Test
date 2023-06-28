import {
  Button,
  Typography,
  MobileStepper,
  IconButton,
  Grid,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import './FirstLoginTeacher.css'
import { useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import AboutYouStepperOne from './aboutYouStepperOne/AboutYouStepperOne.tsx'
import AboutYourRoleStepperTwo from './aboutYourRoleStepperTwo/AboutYourRoleStepperTwo.tsx'
import SubjectInterestsStepperThree from './subjectInterestsStepperThree/SubjectInterestsStepperThree.tsx'
import StudentsGradeStepperFour from './studentsGradeStepperFour/StudentsGradeStepperFour.tsx'
import SchoolStepperSix from './schoolStepperSix/SchoolStepperSix.tsx'
import WizerInterestsStepperFive from './wizerInterestsStepperFive/WizerInterestsStepperFive.tsx'
import WelcomeToWizerDialog from './welcomeToWizerDialog/WelcomeToWizerDialog.tsx'
import { Link } from 'react-router-dom'

function FirstLoginTeacher() {
  /* i18n translation dependencies */
  const { t } = useTranslation()
  /* i18n translation dependencies */

  /* Welcome To Wizer Dialog dependencies */
  const [welcomeToWizerDialog, setWelcomeToWizerDialog] =
    useState<boolean>(false)
  /* Welcome To Wizer Dialog dependencies */

  /* Dependencies for stepper component */
  const [activeStep, setActiveStep] = useState(0)
  const totalSteps = 6

  const handleStepperNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleStepperBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
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
                  margin: 0,
                  padding: 0,
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'transparent',
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
    )
  }
  /* Stepper component dependencies */

  /* Dialog dependencies */
  const handleWelcomeToWizerDialogOpen = () => {
    setWelcomeToWizerDialog(true)
  }

  const handleWelcomeToWizerDialogClose = () => {
    setWelcomeToWizerDialog(false)
  }
  /* Dialog dependencies */

  return (
    <>
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
              <SubjectInterestsStepperThree />
            </>
          )}
          {activeStep === 3 && (
            <>
              <StudentsGradeStepperFour />
            </>
          )}
          {activeStep === 4 && (
            <>
              <WizerInterestsStepperFive />
            </>
          )}
          {activeStep === 5 && (
            <>
              <SchoolStepperSix />
            </>
          )}
          {activeStep === 5 ? (
            <div className="JoinThisSchoolButtonWrapper">
              <Button
                className="Button"
                variant="contained"
                fullWidth
                color="secondary"
                onClick={handleWelcomeToWizerDialogOpen}
              >
                {t('FirstLoginTeacher.stepSix.joinThisSchool')}
              </Button>
              <Grid item xs={4} sm={6} md={12}>
                <Link to="#" className="SkipLink">
                  {t('FirstLoginTeacher.stepSix.skipLink')}
                </Link>
              </Grid>
            </div>
          ) : (
            <Button
              className="Button"
              variant="contained"
              fullWidth
              color="secondary"
              onClick={handleStepperNext}
            >
              {t('FirstLoginTeacher.next')}
            </Button>
          )}
        </div>
        {
          <WelcomeToWizerDialog
            open={welcomeToWizerDialog}
            handleClose={handleWelcomeToWizerDialogClose}
          />
        }
      </div>
    </>
  )
}

export default FirstLoginTeacher
