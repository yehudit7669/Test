import { Grid, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import FormLabel from '@mui/material/FormLabel'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/redux-hooks'
import MultipleSelectableChips from '../../../../common/multipleSelectableChips/MultipleSelectableChips'
import Actions from '../../../../../actions'

const StudentsGradeStepperFour = () => {
  /* i18n translation dependencies */
  const { t } = useTranslation()
  /* i18n translation dependencies */

  const dispatch = useAppDispatch()
  const { firstLoginTeacherDetails, studentsGradeChipDetails } = useAppSelector(
    (state) => state.firstLoginTeacher,
  )

  /* Stepper Three component dependencies */
  const renderTitle = () => (
    <Typography className="Title">
      {' '}
      {t('FirstLoginTeacher.stepFour.title')}
    </Typography>
  )
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t('FirstLoginTeacher.stepFour.subTitle')}
    </Typography>
  )

  const renderSubjectsInterestSelectableChips = () => {
    /* Function definition passed as a prop to multiple Selectable chips to get the selected chips data */
    const handleGetSelectedChipsDetails = (
      multipleSelectableChipsArr: {
        id: string
        label: string
        selected: boolean
      }[],
    ) => {
      /* Dispatching an action to update the selected state of the selectable chips */
      dispatch(
        Actions.createAction(
          Actions.FIRST_LOGIN_TEACHER_UPDATE_STUDENTS_GRADE_CHIP_DETAILS,
          { multipleSelectableChipsArr },
        ),
      )
      /* Dispatching an action to update the selected state of the selectable chips */
      const dataToBeSent = {
        studentClasses: {
          ...firstLoginTeacherDetails.studentClasses,
          classes: multipleSelectableChipsArr
            .filter((data) => data.selected)
            .map((data) => data.id),
        },
      }
      dispatch(
        Actions.createAction(
          Actions.SET_FIRST_LOGIN_TEACHER_DETAILS,
          dataToBeSent,
        ),
      )
    }
    /* Function definition passed as a prop to multiple Selectable chips to get the selected chips data */
    return (
      <>
        <MultipleSelectableChips
          multipleSelectableChipDetails={studentsGradeChipDetails}
          handleGetSelectedChipsDetails={handleGetSelectedChipsDetails}
        />
      </>
    )
  }

  const renderFirstLoginTeacherForm = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={6} md={12}>
            <FormLabel className="FormLabel">
              {t('FirstLoginTeacher.stepFour.otherGrades')}?
            </FormLabel>
            <TextField
              className="GenericFormFieldMargin"
              onChange={(e: React.SyntheticEvent) => {
                const dataToBeSent = {
                  studentClasses: {
                    ...firstLoginTeacherDetails.studentClasses,
                    otherClasses: (e.target as HTMLInputElement).value,
                  },
                }
                dispatch(
                  Actions.createAction(
                    Actions.SET_FIRST_LOGIN_TEACHER_DETAILS,
                    dataToBeSent,
                  ),
                )
              }}
              value={firstLoginTeacherDetails.studentClasses.otherClasses}
              label="Type here (seperate by comma)"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </>
    )
  }
  /* Stepper Three component dependencies */

  return (
    <>
      {renderTitle()}
      {renderSubTitle()}
      {renderSubjectsInterestSelectableChips()}
      {renderFirstLoginTeacherForm()}
    </>
  )
}

export default StudentsGradeStepperFour
