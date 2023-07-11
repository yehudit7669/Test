import { Form } from 'react-final-form'
import { useAppDispatch } from '../../../../../hooks/redux-hooks'
import {
  editCustomerAction,
  getCustomer,
  newCustomerAction,
  sendInvitationsAction,
} from '../../../../../services/customer/customerServices'
import { useState, useCallback, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SubmitButton } from '../../../../common/ui/buttons/submitButton'
import SchoolLinkPopup from './schoolLinkPopup/SchoolLinkPopup'
import { SchoolInfo } from './schoolInfo/SchoolInfo'
import { ContactInfo } from './contactInfo/contactInfo'
import { DealsInfo } from './dealsInfo/dealsInfo'
import './CustomerScreen.css'
import MainLayout from '../../../../layouts/MainLayout'
import { useLocation, useNavigate, useParams } from 'react-router'
import { routes } from '../../../../../constants'
import Loader from '../../../../common/loader'

export const CustomerScreen = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [openSchoolLinkPopup, setOpenSchoolLinkPopup] = useState<boolean>(false)
  const [schoolLink, setSchoolLink] = useState<any>(null)
  const [emailsToInvitation, setEmailsToInvitation] = useState<Array<string>>(
    [],
  )
  const navigate = useNavigate()
  const location = useLocation().pathname
  const [customer, setCustomer] = useState<any>(null)
  const isEdit = location.includes('edit') ? true : false
  const params = useParams()

  const renderCustomer = useCallback(async () => {
    const res = await dispatch(
      getCustomer(setError, setLoading, String(params.id)),
    )
    if (!error) {
      setCustomer(res?.data)
      console.log('customer', customer)
    }
  }, [dispatch, error, customer, params.id])

  useEffect(() => {
    if (isEdit) renderCustomer()
  }, [isEdit])

  const sendInvitation = useCallback(
    async (schoolId: string) => {
      await dispatch(
        sendInvitationsAction(
          setError,
          setLoading,
          emailsToInvitation,
          schoolId,
        ),
      )
      if (error) {
        alert('error on send the emails')
      }
    },
    [dispatch, emailsToInvitation, error],
  )

  const onSubmit = useCallback(
    async (values: any) => {
      values.personContact ? (values.personContact.type = 'person_contact') : ''
      values.personBilling ? (values.personBilling.type = 'person_billing') : ''
      values.owner.type = 'owner'
      const contacts = [values.owner]
      values.personContact ? contacts.push(values.personContact) : ''
      values.personBilling ? contacts.push(values.personBilling) : ''
      const customerData = {
        school: values.school,
        contacts: contacts,
        deals: values.deals,
      }
      if (!isEdit) {
        const res = await dispatch(
          newCustomerAction(customerData, setError, setLoading),
        )
        if (!error) {
          sendInvitation(res?.data?.schoolId)
          setSchoolLink(res?.data)
          setOpenSchoolLinkPopup(true)
        }
      } else {
        await dispatch(editCustomerAction(customerData, setError, setLoading))
        if (!error) {
          sendInvitation(customer?.school?.id)
        }
      }
    },
    [dispatch, error, isEdit, customer, sendInvitation],
  )

  const renderInitialValues = () => {
    return {
      school: customer?.school,
      personContact: customer?.contacts?.personContact,
      personBilling: customer?.contacts?.personBilling,
      owner: customer?.contacts?.owner,
    }
  }
  if (loading) {
    return (
      <div className="Worksheet-container-loader">
        <Loader />
      </div>
    )
  }
  if (error) {
    return <div className="Worksheet-container-error">{error}</div>
  }
  return (
    <>
      <SchoolLinkPopup
        dashboardLink={schoolLink}
        open={openSchoolLinkPopup}
        handleClose={() => {
          setOpenSchoolLinkPopup(false)
          navigate(`/${routes.ADMIN_DASHBOARD}`)
        }}
      />
      <MainLayout></MainLayout>
      <div className="header">
        {isEdit ? customer?.school?.schoolName : t('NewCustomer.mainText')}
      </div>
      <Form initialValues={renderInitialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <Grid container width={'80%'} margin="auto">
            <form onSubmit={handleSubmit}>
              <SchoolInfo />
              <div className="line"></div>
              <ContactInfo />
              <div className="line"></div>
              <DealsInfo
                dealList={customer?.deals}
                isEdit={isEdit}
                emailsToInvitation={emailsToInvitation}
                setEmailsToInvitation={setEmailsToInvitation}
              />
              <div className="line"></div>
              <SubmitButton
                className="saveButton"
                text={t('NewCustomer.saveButton')}
                onSubmit={handleSubmit}
              />
            </form>
          </Grid>
        )}
      </Form>
    </>
  )
}
