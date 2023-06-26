import Actions from '../../actions'
import * as requestFromServer from './worksheetApis'
import { Dispatch, SetStateAction } from 'react'
import { AxiosResponse } from 'axios'

export const getWorksheetById =
  (
    workSheetId: string | undefined,
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      setLoading(true)
      const response: AxiosResponse<any> = await requestFromServer.getWorksheet(
        workSheetId
      )

      if (response.status === 200) {
        setLoading(false)
        dispatch(Actions.createAction(Actions.FETCH_WORKSHEET, response.data))
        return response
      } else {
        setLoading(false)
        setError(response?.data?.message)
        return null
      }
    } catch (err: any) {
      setLoading(false)
      console.log('errrrrr', err)
      setError(err?.response?.data)
      throw err
    }
  }
