import { Grid, TextField, Typography } from '@mui/material'
import Radio from '@mui/material/Radio'
import { useTranslation } from 'react-i18next'
import FormLabel from '@mui/material/FormLabel'
import { Link } from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/redux-hooks'
import Actions from '../../../../../actions'
import Loader from '../../../../common/loader'
import { useState, useEffect } from 'react'

const SchoolStepperFive = () => {
  /* i18n translation dependencies */
  const { t } = useTranslation()
  /* i18n translation dependencies */

  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const { schoolDetails } = useAppSelector((state) => state.firstLoginTeacher)

  /* Temporary setTimeout for loader - There will be an API call here instead of setTimeout */
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }, [loading])
  /* Temporary setTimeout for loader - There will be an API call here instead of setTimeout */

  /* Stepper Three component dependencies */
  const renderTitle = () => (
    <Typography className="Title">
      {' '}
      {t('FirstLoginTeacher.stepSix.title')}
    </Typography>
  )

  const renderFirstLoginTeacherForm = () => {
    /* Function definition for when the school is selected */
    const handleChangeSchool = (event: React.SyntheticEvent) => {
      /* Dispatching an action to update the selected state of the schools */
      const eventTargetValue = (event.target as HTMLInputElement).value
      dispatch(
        Actions.createAction(
          Actions.FIRST_LOGIN_TEACHER_UPDATE_SCHOOL_DETAILS,
          { eventTargetValue }
        )
      )
      /* Dispatching an action to update the selected state of the schools */

      const dataToBeSent = {
        school_Id: eventTargetValue,
      }
      dispatch(
        Actions.createAction(
          Actions.SET_FIRST_LOGIN_TEACHER_DETAILS,
          dataToBeSent
        )
      )
    }
    /* Function definition for when the school is selected */

    /* Function definition for searching a school */
    const handleSearchSchool = () => {
      setLoading(true)
    }
    /* Function definition for searching a school */

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={6} md={12}>
            <FormLabel className="FormLabel">
              {t('FirstLoginTeacher.stepSix.searchSchool')}
            </FormLabel>
            <TextField
              className="GenericFormFieldMargin"
              variant="outlined"
              fullWidth
              onChange={handleSearchSchool}
            />
          </Grid>
          <div className="SchoolsContainer">
            {!loading &&
              schoolDetails?.map((_data) => {
                return (
                  <>
                    <div className="SchoolElement">
                      <div className="RadioButtonContainer">
                        <Radio
                          checked={_data.selected === true}
                          onChange={handleChangeSchool}
                          value={_data.id}
                        />
                      </div>
                      <div className="SchoolDataContainer">
                        <Typography>{_data.schoolName}</Typography>
                        <Typography>{_data.schoolAddress}</Typography>
                      </div>
                      <div className="NoOfTeachersContainer">
                        <Typography>
                          {_data.totalNoOfTeachers} teachers
                        </Typography>
                      </div>
                    </div>
                  </>
                )
              })}
            {loading && <Loader />}
          </div>
          <Grid item xs={4} sm={6} md={12} textAlign="center">
            <Link to="#" className="DidntSeeYourSchoolLink">
              {t('FirstLoginTeacher.stepSix.didntSeeYourSchoolLink')}
            </Link>
          </Grid>
          <Grid item xs={4} sm={6} md={12} textAlign="center">
            <Link to="#" className="ShareWizerMeLink">
              {t('FirstLoginTeacher.stepSix.shareWizerMeLink')}
            </Link>
          </Grid>
        </Grid>
      </>
    )
  }
  /* Stepper Three component dependencies */

  return (
    <>
      {renderTitle()}
      {renderFirstLoginTeacherForm()}
    </>
  )
}

export default SchoolStepperFive
