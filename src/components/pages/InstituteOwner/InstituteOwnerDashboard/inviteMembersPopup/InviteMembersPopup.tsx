import { useTranslation } from 'react-i18next'
import Popup from '../../../../common/popup/Popup'
import EmailsInput from '../../../../common/ui/emailsInput/EmailsInput'
import Confetti from '../../../../common/confetti/Confetti'
import './InviteMembersPopup.css'

type Props = {
  openInviteMembersPopup: boolean
  openInviteMembersSubmition: boolean
  setEmailsToInvitation: VoidFunction
  emailsToInvitation: Array<string>
  handleClose: VoidFunction
  onSubmit: VoidFunction
}

export default function InviteMembersPopup(props: Props) {
  const { t } = useTranslation()
  return (
    <>
      <Popup
        cancleButton={false}
        submitButton={true}
        submitText={
          props.openInviteMembersSubmition
            ? t('InstituteOwner.dashboardPlanData.inviteMembersBackButton')
            : t('InstituteOwner.dashboardPlanData.inviteMembersSubmitButton')
        }
        title={
          props.openInviteMembersSubmition
            ? t(
                'InstituteOwner.dashboardPlanData.popupAfterInviteMembersSuccessTitle',
              )
            : t('InstituteOwner.dashboardPlanData.popupInviteMembersTitle')
        }
        handleClose={props.handleClose}
        onSubmit={props.onSubmit}
        open={props.openInviteMembersPopup}
        classNameDialog="inviteMembersPopup"
        classNameCloseIcon="closeIconPopupInviteMembers"
        classNameTitle="titlePopupInviteMembers"
        classNameSubmitButton="submitInviteMembers"
      >
        {props.openInviteMembersSubmition ? (
          <div className="sentEmails">
            {t(
              'InstituteOwner.dashboardPlanData.popupAfterInviteMembersSuccessSubTitle',
            )}
          </div>
        ) : (
          <>
            <div className="inviteTeachersPopup">
              {t('InstituteOwner.dashboardPlanData.popupInviteMembersSubTitle')}
            </div>
            <div className="inviteTeachersExplanation">
              {t(
                'InstituteOwner.dashboardPlanData.popupInviteMembersExplanation',
              )}
            </div>
          </>
        )}
        <EmailsInput
          value={props.emailsToInvitation}
          setValue={props.setEmailsToInvitation}
          label="email"
          placeholder=" "
        ></EmailsInput>
      </Popup>
      {props.openInviteMembersSubmition && <Confetti />}
    </>
  )
}
