import axios from 'axios'

export const SIGN_UP_URL = `auth/register`

export const signup = (
  email: string,
  password: string,
  role: any,
  classCode?: string
) => {
  if (role === 'student') {
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
