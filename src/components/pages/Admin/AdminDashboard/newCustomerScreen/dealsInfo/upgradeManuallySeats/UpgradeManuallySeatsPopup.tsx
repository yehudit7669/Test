import { useTranslation } from 'react-i18next'
import EmailsInput from '../../../../../../common/ui/emailsInput/EmailsInput'
import Popup from '../../../../../../common/popup/Popup'

type VoidFunction = (array: Array<string>) => void

type Props = {
  setEmailsToInvitation: VoidFunction
  emailsToInvitation: Array<string>
  setOpenPopup: (status: boolean) => void
  isOpenPopup: boolean
}
const UpgradeManuallySeatsPopup = (props: Props) => {
  const { t } = useTranslation()
  return (
    <>
      <Popup
        height={'400px'}
        width={'100'}
        cancleButton={false}
        cancleText=""
        submitButton={true}
        submitText="Apply"
        title={t('NewCustomer.DealsInfo.UpgradeManuallySeatsPopup.title')}
        open={props.isOpenPopup}
        onSubmit={() => {
          props.setOpenPopup(false)
        }}
        handleClose={() => {
          props.setOpenPopup(false)
        }}
      >
        {t('NewCustomer.DealsInfo.UpgradeManuallySeatsPopup.subTitle')}
        <EmailsInput
          value={props.emailsToInvitation}
          setValue={props.setEmailsToInvitation}
          label={t('NewCustomer.DealsInfo.UpgradeManuallySeatsPopup.email')}
          placeholder=" "
        ></EmailsInput>
      </Popup>
    </>
  )
}

export default UpgradeManuallySeatsPopup
