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

export const editCustomer = (customer: any) => {
  return axios.put(`${CUSTOMER_URL}/${customer.school.id}`, customer)
}

export const getCustomer = (customerId: string) => {
  return axios.get(`${CUSTOMER_URL}/${customerId}`)
}

export const sendInvitation = (emails: Array<string>) => {
  return axios.post(`${CUSTOMER_URL}/send-invitation`, emails)
}
