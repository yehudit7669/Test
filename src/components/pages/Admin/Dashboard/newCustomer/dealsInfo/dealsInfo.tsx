import { Field } from 'react-final-form'
import { PluseIcon } from '../../../../../../assets/svgs/svg-components'
import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FinalFormInput } from '../../../../../common/ui/form/finalFormInput'
import { required } from '../../../../../common/validationFields/validationFeilds'

export const DealsInfo = () => {
  const { t } = useTranslation()
  const [deals, setDeals] = useState([1])

  useEffect(() => {
    setDeals(deals)
  }, [deals])

  return (
    <>
      <div className="subHeader">deals info</div>
      {deals.map((deal, index) => {
        return (
          <>
            <Grid
              key={deal}
              container
              item
              rowSpacing={3}
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={2}>
                <Field
                  type="number"
                  validate={required}
                  name={`deals[${index}].numberSeats`}
                  component={FinalFormInput}
                  label={t('NewCustomer.DealsInfo.numberSeats')}
                />
              </Grid>
              <Grid item xs={2}>
                <Field
                  type="number"
                  validate={required}
                  name={`deals[${index}].amountPaid`}
                  component={FinalFormInput}
                  label={t('NewCustomer.DealsInfo.amountPaid')}
                />
              </Grid>
              <Grid item xs={2}>
                <Field
                  validate={required}
                  name={`deals[${index}].startDate`}
                  component={FinalFormInput}
                  type="date"
                  label={t('NewCustomer.DealsInfo.startDate')}
                />
              </Grid>
              <Grid item xs={2}>
                <Field
                  validate={required}
                  name={`deals[${index}].endDate`}
                  component={FinalFormInput}
                  type="date"
                  label={t('NewCustomer.DealsInfo.endDate')}
                />
              </Grid>
              <Grid item xs={2}>
                <Field
                  name={`deals[${index}].PONumber`}
                  component={FinalFormInput}
                  label={t('NewCustomer.DealsInfo.PONumber')}
                />
              </Grid>
              <Grid item xs={2}>
                <Field
                  name={`deals[${index}].quoteNumber`}
                  component={FinalFormInput}
                  type="date"
                  label={t('NewCustomer.DealsInfo.quoteNumber')}
                />
              </Grid>
            </Grid>
          </>
        )
      })}
      <div className="addDeal">
        <PluseIcon />
        <label
          onClick={() => {
            deals.push(1)
          }}
        >
          {t('NewCustomer.DealsInfo.addDeal')}
        </label>
      </div>
    </>
  )
}
