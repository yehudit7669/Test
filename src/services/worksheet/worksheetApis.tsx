import axios from 'axios'

// export const LOGIN_URL = `auth/login`;
export const WORKSHEET_URL = `api/v1/learn/worksheet`
export const FORGOT_PASSWORD_URL = `auth/forgot-password`

export const getWorksheet = (workSheetId: string | undefined) => {
  return axios.get(`${WORKSHEET_URL}/${workSheetId}`)
}
