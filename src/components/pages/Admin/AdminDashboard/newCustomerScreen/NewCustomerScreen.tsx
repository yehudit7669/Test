import { Form } from 'react-final-form'
import { useAppDispatch } from '../../../../../hooks/redux-hooks'
import { newCustomerAction } from '../../../../../services/customer/customerServices'
import { useState, useCallback } from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SubmitButton } from '../../../../common/ui/buttons/submitButton'
import SchoolLinkPopup from './schoolLinkPopup/SchoolLinkPopup'
import { SchoolInfo } from './schoolInfo/schoolInfo'
import { ContactInfo } from './contactInfo/contactInfo'
import { DealsInfo } from './dealsInfo/dealsInfo'
import './newCustomer.css'
import MainLayout from '../../../../layouts/MainLayout'

export const NewCustomerScreen = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [, setLoading] = useState(false)
  const [openSchoolLinkPopup, setOpenSchoolLinkPopup] = useState<boolean>(false)
  const [schoolLink, setSchoolLink] = useState<any>(null)

  const onSubmit = useCallback(
    async (values: any) => {
      values.personContact ? (values.personContact.type = 'person_contact') : ''
      values.personBilling ? (values.personBilling.type = 'person_billing') : ''
      values.owner.type = 'owner'
      const contacts = [values.owner]
      values.personContact ? contacts.push(values.personContact) : ''
      values.personBilling ? contacts.push(values.personBilling) : ''
      const customer = {
        school: values.school,
        contacts: contacts,
        deals: values.deals,
      }
      const res = await dispatch(
        newCustomerAction(customer, setError, setLoading),
      )
      if (!error) {
        setSchoolLink(res?.data)
        setOpenSchoolLinkPopup(true)
      }
    },
    [dispatch, error],
  )

  return (
    <>
      <SchoolLinkPopup
        dashboardLink={schoolLink}
        open={openSchoolLinkPopup}
        handleClose={() => {
          setOpenSchoolLinkPopup(false)
          // dispatch(getAllCustomers(
          //     setError,
          //     setLoading
          // ))
        }}
      />
      <MainLayout></MainLayout>
      <div className="header">{t('NewCustomer.mainText')}</div>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <Grid container width={'80%'} margin="auto">
            <form onSubmit={handleSubmit}>
              <SchoolInfo />
              <div className="line"></div>
              <ContactInfo />
              <div className="line"></div>
              <DealsInfo />
              <div className="line"></div>
              <SubmitButton
                className="saveButton"
                text={t('saveButton')}
                onSubmit={handleSubmit}
              />
            </form>
          </Grid>
        )}
      </Form>
    </>
  )
}
