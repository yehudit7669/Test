import { NavigateFunction } from 'react-router'
import Actions from '../../actions'
import * as requestFromServer from './firstLoginStudentApis'
import { Dispatch, SetStateAction } from 'react'
import { AxiosResponse } from 'axios'

export const getFirstLoginStudentAction =
  (
    DOB: string,
    navigate: NavigateFunction,
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    role: string | undefined,
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      setLoading(true)

      const response: AxiosResponse<any> =
        await requestFromServer.firstLoginStudent(DOB)

      if (response.status === 200) {
        setLoading(false)
        dispatch(
          Actions.createAction(Actions.FIRST_LOGIN_STUDENT, response.data),
        )
        navigate(`/${role}`, { replace: true })

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
