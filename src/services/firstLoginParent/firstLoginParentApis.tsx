import axios from 'axios'

export const FIRST_LOGIN_PARENT_URL = `auth/parent/details`

export const firstLoginParent = (firstLoginParentDetails: {
  [key: string]: any
}) => {
  return axios.post(
    FIRST_LOGIN_PARENT_URL,
    {
      ...firstLoginParentDetails,
    },
    // { headers: {} }
  )
}
