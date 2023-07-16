import axios from 'axios'
import { routes } from '../../constants'

export const newCustomer = (customer: any) => {
  return axios.post(`${routes.CUSTOMER_URL}`, customer)
}

export const getAllCustomers = () => {
  return axios.get(`${routes.CUSTOMER_URL}/customer-list`)
}

export const deleteCustomer = (customerId: string) => {
  return axios.delete(`${routes.DELETE_CUSTOMER_URL}${customerId}`)
}

export const editCustomer = (customer: any) => {
  return axios.put(`${routes.CUSTOMER_URL}/${customer.school.id}`, customer)
}

export const getCustomer = (customerId: string) => {
  return axios.get(`${routes.CUSTOMER_URL}/${customerId}`)
}

export const sendInvitation = (body: any) => {
  return axios.post(routes.INVITATION_TEACHER, body)
}

export const getCustomerByEmail = (email: string) => {
  return axios.get(`${routes.CUSTOMER_URL}/${email}`)
}
