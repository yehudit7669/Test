import axios from 'axios'

export const TEACHER_LIST = `api/v2/teacher/teacher-list`

export const getTeacherListByAdminId = (customerId: string) => {
  return axios.get(`${TEACHER_LIST}/${customerId}`)
}
