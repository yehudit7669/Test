import axios from 'axios'

// export const LOGIN_URL = `auth/login`;
export const LOGIN_URL = `api/v2/auth/login`
export const FORGOT_PASSWORD_URL = `auth/forgot-password`

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
