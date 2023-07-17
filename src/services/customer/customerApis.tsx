import axios from 'axios'

export const CUSTOMER_URL = `api/v2/customer`

export const newCustomer = (customer: any) => {
  return axios.post(`${CUSTOMER_URL}`, customer)
}

export const getAllCustomers = () => {
  return axios.get(`${CUSTOMER_URL}/customer-list`)
}

export const deleteCustomer = (customerId: string) => {
  return axios.delete(`${CUSTOMER_URL}/delete-customer/${customerId}`)
}
