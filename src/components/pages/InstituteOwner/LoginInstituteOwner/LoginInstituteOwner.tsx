import { Button, TextField } from '@mui/material'
import './LoginInstituteOwner.css'
import AdminMainLayout from '../../../layouts/AdminMainLayout'
import Tooltip from '@mui/material/Tooltip'
import { useEffect, useLayoutEffect, useState } from 'react'
import { loginValidations } from '../../../../validations/authValidations'
import { useAppDispatch } from '../../../../hooks/redux-hooks'
import { getUserAction } from '../../../../services/auth/authServices'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import useUser from '../../../../hooks/useUser'
import { useTranslation } from 'react-i18next'
import Loader from '../../../common/loader'

export default function LoginInstituteOwner() {
  const [openTooltip, setOpenTooltip] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const [, setToken] = useLocalStorage()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [user] = useUser()
  const { t } = useTranslation()

  useLayoutEffect(() => {
    if (user) {
      navigate(`/${user?.role}`)
    }
  }, [navigate, user])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    const validate = loginValidations(email, password)
    if (validate.status) {
      setError(validate.message)
    } else {
      setError('')
      await dispatch(
        await getUserAction(
          email,
          password,
          false,
          setToken,
          navigate,
          setError,
          setLoading,
        ),
      )
    }
  }
  useEffect(() => {
    if (error != '') {
      setOpenTooltip(true)
    }
  }, [error])
  useEffect(() => {
    const handleClickOutsideTooltip = () => {
      setOpenTooltip(false)
    }

    document.addEventListener('click', handleClickOutsideTooltip)

    return () => {
      document.removeEventListener('click', handleClickOutsideTooltip)
    }
  }, [])

  if (loading) {
    return (
      <div className="Worksheet-container-loader">
        <Loader />
      </div>
    )
  }

  return (
    <form className="FirstLoginStudentForm" onSubmit={(e) => handleSignIn(e)}>
      <div className="InstituteOwnerLoginContainer">
        <AdminMainLayout />
        <div className="loginContainer">
          <div className="titleLogin">
            {t('InstituteOwner.loginPage.signIn')}
          </div>
          <div className="textFieldsForLogin">
            <Tooltip
              title={
                <span>
                  {t('InstituteOwner.loginPage.tooltipFirstLine')}
                  <br />
                  {t('InstituteOwner.loginPage.tooltipSecondLine')}
                </span>
              }
              placement="bottom"
              arrow
              open={openTooltip}
              classes={{ tooltip: 'customTooltip', arrow: 'arrow' }}
            >
              <TextField
                placeholder="Enter your email"
                inputProps={{ className: 'textFieldLogin' }}
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Tooltip>

            <TextField
              placeholder="Password"
              inputProps={{ className: 'textFieldLogin' }}
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="submitButtonLogin"
            variant="contained"
            color="secondary"
            type="submit"
          >
            {t('InstituteOwner.loginPage.submitButton')}
          </Button>
        </div>
      </div>
    </form>
  )
}
