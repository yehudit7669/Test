import { Field } from 'react-final-form'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  email,
  required,
} from '../../../../../common/validationFields/validationFeilds'
import { FinalFormInput } from '../../../../../common/ui/form/finalFormInput'

export const ContactInfo = () => {
  const { t } = useTranslation()
  const contactTypes = [
    { type: 'personContact', value: 'Contact Person' },
    { type: 'personBilling', value: 'Contact Billing' },
    { type: 'owner', value: 'Owner' },
  ]
  return (
    <>
      <div className="subHeader">Contact Info</div>
      <Grid container>
        {contactTypes.map((type) => {
          return (
            <>
              <Grid
                container
                rowSpacing={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={1.5}>
                  <div className="contactType">
                    {t(`NewCustomer.ContactInfo.${type.type}`)}
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <Field
                    validate={type.type == 'owner' ? required : undefined}
                    name={`${type.type}.firstName`}
                    component={FinalFormInput}
                    label={t('NewCustomer.ContactInfo.firstName')}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Field
                    validate={type.type == 'owner' ? required : undefined}
                    name={`${type.type}.lastName`}
                    component={FinalFormInput}
                    label={t('NewCustomer.ContactInfo.lastName')}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    validate={type.type == 'owner' ? email : undefined}
                    name={`${type.type}.email`}
                    component={FinalFormInput}
                    label={t('NewCustomer.ContactInfo.email')}
                  />
                </Grid>
                {type.type == 'owner' && (
                  <Grid item xs={2}>
                    <Field
                      validate={required}
                      name={`${type.type}.phoneNumber`}
                      component={FinalFormInput}
                      label={t('NewCustomer.ContactInfo.phoneNumber')}
                    />
                  </Grid>
                )}
              </Grid>
            </>
          )
        })}
      </Grid>
    </>
  )
}
