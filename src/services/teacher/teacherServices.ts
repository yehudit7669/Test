import Actions from '../../actions'
import * as requestFromServer from './teacherApis'
import { Dispatch, SetStateAction } from 'react'
import { AxiosResponse } from 'axios'

export const getTeachersBySchoolId =
  (
    customerId: string,
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      const response: AxiosResponse<any> =
        await requestFromServer.getTeacherListByAdminId(customerId)

      if (response.status === 200) {
        setLoading(false)
        dispatch(Actions.createAction(Actions.GET_TEACHERS, response.data))

        return response
      } else {
        setLoading(false)
        setError(response?.data?.message)
        return null
      }
    } catch (err: any) {
      setLoading(false)
      setError(err?.response?.data?.message)
      throw err
    }
  }
