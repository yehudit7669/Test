import axios from 'axios'
import { StatusQuote } from '../../reducers/quoteReducer'
import { routes } from '../../constants'

export const getAllQuoteRequests = () => {
  return axios.get(`${routes.QUOTE_URL}/quote-request-list`)
}

export const updateQuoteRequestStatus = (status: StatusQuote, id: string) => {
  return axios.put(`${routes.QUOTE_URL}/update-quote-request-status`, {
    status,
    id,
  })
}

export const deleteQuote = (quoteId: string) => {
  return axios.delete(`${routes.QUOTE_URL}/delete-quote-request/${quoteId}`)
}

export const createQuote = (quote: any) => {
  return axios.post(`${routes.CREATE_QUOTE_URL}`, quote)
}
