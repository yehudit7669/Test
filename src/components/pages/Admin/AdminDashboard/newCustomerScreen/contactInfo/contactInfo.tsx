import { Field } from 'react-final-form'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FinalFormInput } from '../../../../../common/ui/form/finalFormInput'
import {
  email,
  required,
} from '../../../../../common/validationFields/validationFeilds'

export const ContactInfo = () => {
  const { t } = useTranslation()
  const contactTypes = [
    { type: 'personContact', value: 'Contact Person' },
    { type: 'personBilling', value: 'Contact Billing' },
    { type: 'owner', value: 'Owner' },
  ]
  const validationField = (value: string, fromFiedls: any, field: any) => {
    let validateMessage = undefined
    const fieldName = field?.name
    if (
      (value && !fieldName?.includes('email')) ||
      (fieldName?.includes('email') && !email(value))
    ) {
      return undefined
    }
    const bracketIndex = fieldName?.indexOf('.')
    const contactType = fieldName?.substring(0, bracketIndex)
    const currentField = fromFiedls?.[contactType]
    const keys = currentField && Object?.keys(currentField)
    keys?.forEach((key: string) => {
      if (currentField[key] && fieldName?.substring(bracketIndex + 2) != key) {
        if (fieldName?.includes('email') && key == 'email') {
          validateMessage = email(currentField[key])
        } else {
          validateMessage = t('Global.required')
        }
        return
      }
    })
    return validateMessage
  }

  return (
    <>
      <div className="subHeader">{t('NewCustomer.ContactInfo.title')}</div>
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
                    validate={type.type == 'owner' ? required : validationField}
                    name={`${type.type}.firstName`}
                    component={FinalFormInput}
                    label={t('NewCustomer.ContactInfo.firstName')}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Field
                    validate={type.type == 'owner' ? required : validationField}
                    name={`${type.type}.lastName`}
                    component={FinalFormInput}
                    label={t('NewCustomer.ContactInfo.lastName')}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    validate={type.type == 'owner' ? email : validationField}
                    name={`${type.type}.email`}
                    component={FinalFormInput}
                    label={t('NewCustomer.ContactInfo.email')}
                  />
                </Grid>
                {type.type == 'personBilling' && (
                  <Grid item xs={2}>
                    <Field
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
