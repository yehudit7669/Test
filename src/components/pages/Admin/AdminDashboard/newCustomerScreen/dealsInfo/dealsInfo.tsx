import { Field } from 'react-final-form'
import { PluseIcon } from '../../../../../../assets/svgs/svg-components'
import { useState } from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FinalFormInput } from '../../../../../common/ui/form/finalFormInput'
import { required } from '../../../../../common/validationFields/validationFeilds'
import UpgradeManuallySeatsPopup from './upgradeManuallySeats/UpgradeManuallySeatsPopup'
import { DealList } from './dealList/DealList'

type VoidFunction = (array: Array<string>) => void

type Props = {
  setEmailsToInvitation: VoidFunction
  emailsToInvitation: Array<string>
  isEdit: boolean
  dealList: Array<any> | null
}
export const DealsInfo = (props: Props) => {
  const { t } = useTranslation()
  const [dealsFields, setDealsFields] = useState(props.isEdit ? [] : [1])
  const [isOpenPopup, setOpenPopup] = useState<boolean>(false)
  let numberOfSeats = 0
  props.dealList?.map((deal) => (numberOfSeats += deal?.numberSeats))
  return (
    <>
      <div className="subHeader">{t('NewCustomer.DealsInfo.title')}</div>
      {props.isEdit && (
        <div>
          <label className="subHeader">{`${t(
            'NewCustomer.DealsInfo.numberSeats',
          )}: ${0}/${numberOfSeats}`}</label>
        </div>
      )}
      {dealsFields.map((field, index) => {
        return (
          <>
            <UpgradeManuallySeatsPopup
              emailsToInvitation={props.emailsToInvitation}
              setOpenPopup={setOpenPopup}
              isOpenPopup={isOpenPopup}
              setEmailsToInvitation={props.setEmailsToInvitation}
            ></UpgradeManuallySeatsPopup>
            <Grid
              key={field}
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
                  label={t('NewCustomer.DealsInfo.quoteNumber')}
                />
              </Grid>
            </Grid>
          </>
        )
      })}
      {dealsFields.length ? (
        <label
          className="linkText"
          onClick={() => {
            setOpenPopup(true)
          }}
        >
          {t('NewCustomer.DealsInfo.UpgradeManuallySeatsPopup.title')}
        </label>
      ) : (
        ''
      )}
      <div className="addDeal">
        <PluseIcon />
        <label
          onClick={() => {
            dealsFields.push(1)
            setDealsFields([...dealsFields])
          }}
        >
          {t('NewCustomer.DealsInfo.addDeal')}
        </label>
      </div>

      {props.isEdit && <DealList deals={props.dealList}></DealList>}
    </>
  )
}
