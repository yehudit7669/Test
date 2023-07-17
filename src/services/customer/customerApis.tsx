import axios from 'axios'

export const CUSTOMER_URL = `api/v2/customer`
export const DELETE_CUSTOMER_URL = `${CUSTOMER_URL}/delete-customer/`
const INVITATION_TEACHER = `api/v2/invitation-teacher/send-emails`

export const newCustomer = (customer: any) => {
  return axios.post(`${CUSTOMER_URL}`, customer)
}

export const getAllCustomers = () => {
  return axios.get(`${CUSTOMER_URL}/customer-list`)
}

export const deleteCustomer = (customerId: string) => {
  return axios.delete(`${DELETE_CUSTOMER_URL}${customerId}`)
}

export const editCustomer = (customer: any) => {
  return axios.put(`${CUSTOMER_URL}/${customer.school.id}`, customer)
}

export const getCustomer = (customerId: string) => {
  return axios.get(`${CUSTOMER_URL}/${customerId}`)
}

export const sendInvitation = (body: any) => {
  return axios.post(INVITATION_TEACHER, body)
}
