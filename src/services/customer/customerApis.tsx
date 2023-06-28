import axios from 'axios'

export const NEW_CUSTOMER_URL = `/customer/new`

export const newCustomer = (customer: any
) => {
  return axios.post(
    NEW_CUSTOMER_URL,
    customer
  )
}
