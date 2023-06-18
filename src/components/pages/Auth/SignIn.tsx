import { Link, useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import './Auth.css'
import { useLayoutEffect, useState } from 'react'
import { getUserAction } from '../../../services/auth/authServices'
import { useAppDispatch } from '../../../hooks/redux-hooks'
import {
  GoogleIcon,
  MicrosoftIcon,
} from '../../../assets/svgs/svg-components.tsx'
import useLocalStorage from '../../../hooks/useLocalStorage.tsx'
import { routes } from '../../../constants/routeConsts.tsx'

import SingleLineColorText from '../../common/errorText/SingleLineColorText.tsx'
import { loginValidations } from '../../../validations/authValidations.tsx'
import useUser from '../../../hooks/useUser.tsx'

function SignIn() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [, setToken] = useLocalStorage()
  const navigate = useNavigate()
  const [user] = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  /* If user is authenticated then navigate him to dashboard */
  useLayoutEffect(() => {
    if (user) {
      navigate(`/${user?.role}`)
    }
  }, [navigate, user])
  /* If user is authenticated then navigate him to dashboard */

  const renderSignUpButton = () => (
    <div className="Navigation">
      {t('SignIn.newToWizer')}{' '}
      <Link to={`/${routes.SELECT_ROLE}`}>{t('SignIn.signUp')}</Link>
    </div>
  )
  const renderTitle = () => (
    <div className="Title">{t('SignIn.logInToWizer')}</div>
  )
  const renderSubTitle = () => (
    <label className="Subtitle" data-subtitle>
      {t('SignIn.discoverWizer')}
    </label>
  )
  const renderSocialSignIn = () => {
    return (
      <>
        <Button
          className="Button"
          variant="contained"
          fullWidth
          color="inherit"
          data-auth
        >
          <div className="IconContainer">
            <GoogleIcon />
          </div>{' '}
          {t('SignIn.connect.google')}
        </Button>
        <Button
          className="Button"
          variant="contained"
          fullWidth
          color="inherit"
          data-auth
        >
          <div className="IconContainer">
            <MicrosoftIcon />
          </div>{' '}
          {t('SignIn.connect.microsoft')}
        </Button>
      </>
    )
  }

  const renderSignInForm = () => {
    return (
      <form className="SignInForm" onSubmit={(e) => handleSignIn(e)}>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          label="Email"
          variant="outlined"
          fullWidth
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          label="Password"
          variant="outlined"
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              value={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              defaultChecked
            />
          }
          label="Remember Me"
        />
        <Button
          className="Button"
          variant="contained"
          fullWidth
          color="secondary"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress /> : t('SignIn.signIn')}
        </Button>
      </form>
    )
  }
  const renderForgotPassword = () => (
    <Link className="ForgotPasswordLink" to={`/${routes.FORGOT_PASSWORD}`}>
      {t('SignIn.forgotPassword')}
    </Link>
  )

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    const validate = loginValidations(email, password)
    // Check validation
    if (validate.status) {
      setError(validate.message)
    } else {
      setError('')
      // Calling login api , setting user toke, navigating to dashboard and setting error
      dispatch(
        getUserAction(
          email,
          password,
          rememberMe,
          setToken,
          navigate,
          setError,
          setLoading
        )
      )
    }
  }

  return (
    <div className="SignIn">
      {renderSignUpButton()}
      <div className="Wrapper">
        {renderTitle()}
        {renderSubTitle()}
        {renderSocialSignIn()}
        <div className="Subtitle">{t('SignIn.orText')}</div>
        {renderSignInForm()}
        <SingleLineColorText
          text={error}
          variant={'body1'}
          component={'span'}
          color="red"
          align="center"
        />
        {renderForgotPassword()}
      </div>
    </div>
  )
}

export default SignIn
