import axios from 'axios'
import { userRoles } from '../../constants'

// export const LOGIN_URL = `auth/login`;
export const LOGIN_URL = `api/v2/auth/login`
export const FORGOT_PASSWORD_URL = `api/v2/auth/forgot-password`
export const SIGN_UP_URL = `auth/register`

export const login = (email: string, password: string, rememberMe: boolean) => {
  return axios.post(
    LOGIN_URL,
    {
      email,
      password,
      rememberMe,
    }
    // { headers: {} }
  )
}

export const forgotPassword = (email: string) => {
  return axios.post(
    FORGOT_PASSWORD_URL,
    {
      email,
    }
    // { headers: {} }
  )
}

export const signup = (
  email: string,
  password: string,
  role: any,
  classCode?: string
) => {
  if (role === userRoles.STUDENT) {
    return axios.post(
      SIGN_UP_URL,
      {
        email,
        password,
        role,
        classCode,
      }
      // { headers: {} }
    )
  } else {
    return axios.post(
      SIGN_UP_URL,
      {
        email,
        password,
        role,
      }
      // { headers: {} }
    )
  }
}
