import { Grid } from '@mui/material'
import { Field } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { required } from '../../../../../common/validationFields/validationFeilds'
import { FinalFormInput } from '../../../../../common/ui/form/finalFormInput'

export const SchoolInfo = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="subHeader">School Info</div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={3.2}>
          <Field
            validate={required}
            name="school.schoolName"
            component={FinalFormInput}
            label={t('NewCustomer.SchoolInfo.schoolName')}
          />
        </Grid>
        <Grid item xs={3.2}>
          <Field
            name="school.street"
            component={FinalFormInput}
            label={t('NewCustomer.SchoolInfo.street')}
          />
        </Grid>
        <Grid item xs={3.2}>
          <Field
            validate={required}
            name="school.country"
            component={FinalFormInput}
            label={t('NewCustomer.SchoolInfo.country')}
          />
        </Grid>
        <Grid item xs={3.2}>
          <Field
            name="school.city"
            component={FinalFormInput}
            label={t('NewCustomer.SchoolInfo.city')}
          />
        </Grid>
        <Grid item xs={3.2}>
          <Field
            name="school.zip"
            component={FinalFormInput}
            label={t('NewCustomer.SchoolInfo.zip')}
          />
        </Grid>
      </Grid>
    </>
  )
}
