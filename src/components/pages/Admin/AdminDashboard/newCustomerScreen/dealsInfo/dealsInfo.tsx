import { Field } from 'react-final-form'
import { PluseIcon } from '../../../../../../assets/svgs/svg-components'
import { useState } from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FinalFormInput } from '../../../../../common/ui/form/finalFormInput'
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
  const [dealsFields, setDealsFields] = useState(
    props.isEdit
      ? []
      : [
          {
            numberSeats: '',
            amountPaid: '',
            startDate: '',
            endDate: '',
            PONumber: '',
            quoteNumber: '',
          },
        ]
  )
  const [isOpenPopup, setOpenPopup] = useState<boolean>(false)
  let numberOfSeats = 0
  props.dealList?.map((deal) => (numberOfSeats += deal?.numberSeats))

  const required = (value: string, fromFiedls: any, field: any) => {
    let validateMessage = undefined
    if (value) {
      return undefined
    }
    const fieldName = field?.name
    const openingBracketIndex = fieldName?.indexOf('[')
    const closingBracketIndex = fieldName?.indexOf(']')
    const IndexElement = fieldName?.substring(
      openingBracketIndex + 1,
      closingBracketIndex
    )
    const currentField = fromFiedls?.deals?.[IndexElement]
    const keys = currentField && Object?.keys(currentField)
    keys?.forEach((key: string) => {
      if (
        currentField[key] &&
        fieldName?.substring(closingBracketIndex + 2) != key
      ) {
        validateMessage = t('Global.required')
        return
      }
    })
    return validateMessage
  }

  return (
    <>
      <div className="subHeader">{t('NewCustomer.DealsInfo.title')}</div>
      {props.isEdit && (
        <div>
          <label className="subHeader">
            {`${t(
              'NewCustomer.DealsInfo.DealList.numberSeats'
            )}: ${0}/${numberOfSeats}`}
          </label>
        </div>
      )}
      {dealsFields.map((deelFrom, index) => {
        return (
          <>
            <UpgradeManuallySeatsPopup
              emailsToInvitation={props.emailsToInvitation}
              setOpenPopup={setOpenPopup}
              isOpenPopup={isOpenPopup}
              setEmailsToInvitation={props.setEmailsToInvitation}
            ></UpgradeManuallySeatsPopup>
            <Grid
              key={deelFrom.numberSeats}
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
            dealsFields.push({
              numberSeats: '',
              amountPaid: '',
              startDate: '',
              endDate: '',
              PONumber: '',
              quoteNumber: '',
            })
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
