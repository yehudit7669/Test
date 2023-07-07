import Actions from '../../actions'
import * as requestFromServer from './customerApis'
import { Dispatch, SetStateAction } from 'react'
import { AxiosResponse } from 'axios'

export const newCustomerAction =
  (
    customer: { [key: string]: any },
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      setLoading(true)
      const response: AxiosResponse<any> = await requestFromServer.newCustomer(
        customer
      )

      if (response.status === 201) {
        setLoading(false)
        dispatch(Actions.createAction(Actions.NEW_CUSTOMER, response.data))
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

export const getAllCustomers =
  (
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      const response: AxiosResponse<any> =
        await requestFromServer.getAllCustomers()

      if (response.status === 200) {
        setLoading(false)
        dispatch(Actions.createAction(Actions.GET_CUSTOMERS, response.data))

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

export const deleteCustomer =
  (setError: Dispatch<SetStateAction<string>>, customerId: string) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      const response: AxiosResponse<any> =
        await requestFromServer.deleteCustomer(customerId)

      if (response.status === 200) {
        const res = await requestFromServer.getAllCustomers()
        dispatch(Actions.createAction(Actions.GET_CUSTOMERS, res.data))
        return response
      } else {
        setError(response?.data?.message)
        return null
      }
    } catch (err: any) {
      setError(err?.response?.data?.message)
      throw err
    }
  }
