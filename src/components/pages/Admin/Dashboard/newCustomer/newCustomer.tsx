import { Form } from 'react-final-form'
import { useAppDispatch } from '../../../../../hooks/redux-hooks'
import { newCustomerAction } from '../../../../../services/customer/customerServices'
import { useState } from 'react'
import './NewCustomer.css'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SubmitButton } from '../../../../common/ui/buttons/submitButton'
import { SchoolInfo } from './schoolInfo/schoolInfo'
import { ContactInfo } from './contactInfo/contactInfo'
import { DealsInfo } from './dealsInfo/dealsInfo'
import SchoolLinkPopup from './schoolLinkPopup/schoolLinkPopup'
export default function NewCustomer() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [, setLoading] = useState(false)
  const [openSchoolLinkPopup, setOpenSchoolLinkPopup] = useState<boolean>(false)
  const [schoolLink, setSchoolLink] = useState<any>(null)

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
      <div className="header">{t('NewCustomer.NewCustomer')}</div>
      <Form
        onSubmit={async (values: any) => {
          values.personContact
            ? (values.personContact.type = 'person contact')
            : ''
          values.personBilling
            ? (values.personBilling.type = 'person billing')
            : ''
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
            newCustomerAction(customer, setError, setLoading)
          )
          if (!error) {
            setSchoolLink(res?.data)
            setOpenSchoolLinkPopup(true)
          }
        }}
      >
        {({ handleSubmit }) => (
          <Grid container width={'80%'} margin="auto">
            <form onSubmit={handleSubmit}>
              <SchoolInfo />
              <div className="line"></div>
              <ContactInfo />
              <div className={'line'}></div>
              <DealsInfo />
              <div className={'line'}></div>
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
