import { Grid, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import React from 'react'
import FormLabel from '@mui/material/FormLabel'
import MultipleSelectableChips from '../../../../common/multipleSelectableChips/MultipleSelectableChips'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/redux-hooks'
import Actions from '../../../../../actions'

const AboutYourRoleStepperTwo = () => {
  /* i18n translation dependencies */
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const { firstLoginTeacherDetails, teacherRolesChipDetails } = useAppSelector(
    (state) => state.firstLoginTeacher,
  )

  /* Stepper Three component dependencies */
  const renderTitle = () => (
    <Typography className="Title">
      {' '}
      {t('FirstLoginTeacher.stepTwo.title')}
    </Typography>
  )
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t('FirstLoginTeacher.stepTwo.subTitle')}
    </Typography>
  )

  const renderTeacherRoleSelectableChips = () => {
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
          Actions.FIRST_LOGIN_TEACHER_UPDATE_TEACHER_ROLES_CHIP_DETAILS,
          { multipleSelectableChipsArr },
        ),
      )
      /* Dispatching an action to update the selected state of the selectable chips */
      const dataToBeSent = {
        teacherRoles: {
          ...firstLoginTeacherDetails.teacherRoles,
          roles: multipleSelectableChipsArr
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
          multipleSelectableChipDetails={teacherRolesChipDetails}
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
              {t('FirstLoginTeacher.stepTwo.otherRole')}
            </FormLabel>
            <TextField
              className="GenericFormFieldMargin"
              onChange={(e: React.SyntheticEvent) => {
                const dataToBeSent = {
                  teacherRoles: {
                    ...firstLoginTeacherDetails.teacherRoles,
                    otherRoles: (e.target as HTMLInputElement).value,
                  },
                }
                dispatch(
                  Actions.createAction(
                    Actions.SET_FIRST_LOGIN_TEACHER_DETAILS,
                    dataToBeSent,
                  ),
                )
              }}
              value={firstLoginTeacherDetails.teacherRoles.otherRoles}
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
      {renderTeacherRoleSelectableChips()}
      {renderFirstLoginTeacherForm()}
    </>
  )
}

export default AboutYourRoleStepperTwo
