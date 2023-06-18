import { NavigateFunction } from 'react-router'
import Actions from '../../actions'
import * as requestFromServer from './firstLoginTeacherApis'
import { Dispatch, SetStateAction } from 'react'
import { AxiosResponse } from 'axios'
import { routes } from '../../constants'

export const getFirstLoginTeacherAction =
  (
    firstLoginTeacherDetails: { [key: string]: any },
    navigate: NavigateFunction,
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      setLoading(true)

      const response: AxiosResponse<any> =
        await requestFromServer.firstLoginTeacher(firstLoginTeacherDetails)

      if (response.status === 200) {
        setLoading(false)
        dispatch(
          Actions.createAction(Actions.FIRST_LOGIN_TEACHER, response.data)
        )
        navigate(`/${routes.TEACHER}`, { replace: true })

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
