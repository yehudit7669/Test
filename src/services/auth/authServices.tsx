import { NavigateFunction } from 'react-router'
import Actions from '../../actions'
import * as requestFromServer from './authApis'
import { Dispatch, SetStateAction } from 'react'
import { AxiosResponse } from 'axios'
import { routes } from '../../constants'

export const getUserAction =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    setToken: (newToken: string) => void,
    navigate: NavigateFunction,
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      setLoading(true)

      const response: AxiosResponse<any> = await requestFromServer.login(
        email,
        password,
        rememberMe,
      )

      if (response.status === 200) {
        setLoading(false)
        const { token, role } = response.data
        setToken(token)
        dispatch(Actions.createAction(Actions.USER_LOGIN, response.data))
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

export const forgotPasswordAction =
  (
    email: string,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setError: Dispatch<SetStateAction<string>>,
    navigate: NavigateFunction,
    setLoader: Dispatch<SetStateAction<boolean>>,
  ) =>
  async (): Promise<AxiosResponse<any> | null> => {
    try {
      setLoader(true)
      const response: AxiosResponse<any> =
        await requestFromServer.forgotPassword(email)

      if (response.status === 200) {
        setLoader(false)
        setSuccessMessage(response.data.message)
        setTimeout(() => {
          navigate(routes.SIGN_IN)
        }, 5000)
        return response
      } else {
        setLoader(false)
        setError(response?.data?.message)
        return null
      }
    } catch (err: any) {
      setLoader(false)
      setError(err?.response?.data?.message)
      throw err
    }
  }

export const getSignUpAction =
  (
    email: string,
    password: string,
    role: string | undefined,
    setToken: (newToken: string) => void,
    navigate: NavigateFunction,
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    classCode?: string,
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      setLoading(true)

      const response: AxiosResponse<any> = await requestFromServer.signup(
        email,
        password,
        role,
        classCode,
      )

      if (response.status === 200) {
        setLoading(false)
        const { token, role } = response.data
        setToken(token)
        dispatch(Actions.createAction(Actions.USER_SIGN_UP, response.data))
        navigate(`/${routes.GET_STARTED}/${role}`, { replace: true })

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
