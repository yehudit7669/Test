import axios from 'axios'
import { StatusQuote } from '../../reducers/quoteReducer'

export const QUOTE_URL = `api/v2/quote`

export const getAllQuoteRequests = () => {
  return axios.get(`${QUOTE_URL}/quote-request-list`)
}

export const updateQuoteRequestStatus = (status: StatusQuote, id: string) => {
  return axios.put(`${QUOTE_URL}/update-quote-request-status`, { status, id })
}

export const deleteQuote = (quoteId: string) => {
  return axios.delete(`${QUOTE_URL}/delete-quote-request/${quoteId}`)
}
