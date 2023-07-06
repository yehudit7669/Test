import { Button, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import './FirstLoginStudent.css'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { getFirstLoginStudentAction } from '../../../../services/firstLoginStudent/firstLoginStudentServices'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../../hooks/redux-hooks'
import { CalendarIcon } from '../../../../assets/svgs/svg-components'
import useUser from '../../../../hooks/useUser'

function FirstLoginStudent() {
  const { t } = useTranslation()

  /* Routing, navigation and param dependencies */
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  /* Routing, navigation and param dependencies */

  /* Form submission, loading and display error dependencies */
  const [birthDateValue, setBirthDateValue] = useState<Dayjs | null>(null)
  const [formattedDateValue, setFormattedDateValue] = useState('')
  const [, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [user] = useUser()
  /* Form submission, loading and display error dependencies */

  /* Function definition for on change event of date picker */
  const handleChangeBirthDate = (value: Dayjs) => {
    setBirthDateValue(value)
    const formattedDate = dayjs(value).format('DD/MM/YYYY')
    setFormattedDateValue(formattedDate)
  }
  /* Function definition for on change event of date picker */

  /* On submit form */
  const handleSubmitFirstLoginStudentForm = (e: React.FormEvent) => {
    e.preventDefault()
    // Calling signup api , setting user toke, navigating to dashboard and setting error
    const DOB = formattedDateValue
    dispatch(
      getFirstLoginStudentAction(
        DOB,
        navigate,
        setError,
        setLoading,
        user?.role
      )
    )
  }
  /* On submit form */

  return (
    <div className="FirstLoginStudent">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="Wrapper">
          <label className="Title">{t('FirstLoginStudent.birthDate')}</label>
          <form
            className="FirstLoginStudentForm"
            onSubmit={(e) => handleSubmitFirstLoginStudentForm(e)}
          >
            <div className="DatePickerContainer">
              <div className="DateContainer">
                <label className="DatePickerLabel">
                  {t('FirstLoginStudent.dayTitle')}
                </label>
                <DatePicker
                  slots={{
                    openPickerIcon: CalendarIcon,
                  }}
                  className="DatePicker"
                  format="DD"
                  views={['day']}
                  defaultValue={null}
                  value={birthDateValue}
                  onChange={(value: any) => handleChangeBirthDate(value)}
                />
              </div>
              <div className="DateContainer">
                <label className="DatePickerLabel">
                  {t('FirstLoginStudent.monthTitle')}
                </label>
                <DatePicker
                  slots={{
                    openPickerIcon: CalendarIcon,
                  }}
                  className="DatePicker"
                  format="MM"
                  views={['month']}
                  value={birthDateValue}
                  onChange={(value: any) => handleChangeBirthDate(value)}
                />
              </div>

              <div className="DateContainer">
                <label className="DatePickerLabel">
                  {t('FirstLoginStudent.yearTitle')}
                </label>
                <DatePicker
                  slots={{
                    openPickerIcon: CalendarIcon,
                  }}
                  className="DatePicker"
                  format="YYYY"
                  views={['year']}
                  value={birthDateValue}
                  onChange={(value: any) => handleChangeBirthDate(value)}
                />
              </div>
            </div>
            <Button
              className="Button"
              variant="contained"
              fullWidth
              color="secondary"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress /> : t('FirstLoginStudent.submit')}
            </Button>
          </form>
        </div>
      </LocalizationProvider>
    </div>
  )
}

export default FirstLoginStudent
