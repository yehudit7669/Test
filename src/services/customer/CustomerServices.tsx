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
        const response: AxiosResponse<any> =
          await requestFromServer.newCustomer(customer)

        if (response.status === 201) {
          setLoading(false)
          dispatch(
            Actions.createAction(Actions.NEW_CUSTOMER, response.data)
          )
          return response
        } else {
          setLoading(false)
          setError(response?.data?.message)
          return null
        }
      } catch (err: any) {
        console.log(err)
        setLoading(false)
        setError(err?.response?.data?.message)
        throw err
      }
    }
