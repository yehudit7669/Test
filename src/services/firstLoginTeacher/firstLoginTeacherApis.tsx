import axios from 'axios'

export const FIRST_LOGIN_TEACHER_URL = `auth/teacher/details`

export const firstLoginTeacher = (firstLoginTeacherDetails: {
  [key: string]: any
}) => {
  return axios.post(
    FIRST_LOGIN_TEACHER_URL,
    {
      ...firstLoginTeacherDetails,
    }
    // { headers: {} }
  )
}
