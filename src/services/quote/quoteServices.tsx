import Actions from '../../actions'
import * as requestFromServer from './quoteApis'
import { Dispatch, SetStateAction } from 'react'
import { AxiosResponse } from 'axios'
import { StatusQuote } from '../../reducers/quoteReducer'

export const getAllQuoteRequests =
  (
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      const response: AxiosResponse<any> =
        await requestFromServer.getAllQuoteRequests()

      if (response.status === 200) {
        setLoading(false)
        dispatch(Actions.createAction(Actions.QUOTE_REQUEST, response.data))
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

export const updateQuoteRequestStatus =
  (status: StatusQuote, id: string) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    const response: AxiosResponse<any> =
      await requestFromServer.updateQuoteRequestStatus(status, id)
    if (response.status === 200) {
      dispatch(Actions.createAction(Actions.QUOTE_REQUEST, response.data))
      return response
    } else {
      return null
    }
  }

export const deleteQuote =
  (setError: Dispatch<SetStateAction<string>>, quoteId: string) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      const response: AxiosResponse<any> = await requestFromServer.deleteQuote(
        quoteId
      )

      if (response.status === 200) {
        const res = await requestFromServer.getAllQuoteRequests()
        dispatch(Actions.createAction(Actions.QUOTE_REQUEST, res.data))

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

export const createQuote =
  (
    quote: any,
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      setLoading(true)
      const response: AxiosResponse<any> = await requestFromServer.createQuote(
        quote
      )

      if (response.status === 201) {
        const res = await requestFromServer.getAllQuoteRequests()
        setLoading(false)
        dispatch(Actions.createAction(Actions.QUOTE_REQUEST, res.data))
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
