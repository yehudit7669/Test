import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { GroupIcon } from '../../../../../assets/svgs/svg-components'
import Popup from '../../../../common/popup/Popup'
import './InstituteOwnerPlanData.css'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/redux-hooks'
import { createQuote } from '../../../../../services/quote/quoteServices'
import InviteMembersPopup from '../inviteMembersPopup/InviteMembersPopup'
import { sendInvitationsAction } from '../../../../../services/customer/customerServices'
import pictureAnna from '../../../../../assets/images/pictureAnna.jpeg'
import { useTranslation } from 'react-i18next'

export default function InstituteOwnerPlanData() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { customer } = useAppSelector((state: any) => state.customer)
  const { teachers } = useAppSelector((state: any) => state.teacher)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [seatsRequest, setSeatsRequest] = useState('0')
  const [openInviteMembersPopup, setOpenInviteMembersPopup] = useState(false)
  const [openInviteMembersSubmition, setOpenInviteMembersSubmition] =
    useState(false)
  const [emailsToInvitation, setEmailsToInvitation] = useState<Array<string>>(
    []
  )
  const usingSeats = (teachers.length / customer.numberseats) * 100

  const handleClose = () => {
    setOpen(false)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleSubmitQuoteRequest = async () => {
    const quote = {
      currentSeats: String(customer.numberseats),
      seatsRequest: seatsRequest,
      status: 'Quote_sent',
      schoolId: customer.id,
    }
    await dispatch(createQuote(quote, setError, setLoading))
    if (!error && !loading) {
      handleClickOpen()
    }
  }
  const sendInvitation = async () => {
    await dispatch(
      sendInvitationsAction(
        setError,
        setLoading,
        emailsToInvitation,
        customer.id
      )
    )
    if (error) {
      alert(error)
    }
  }

  return (
    <>
      <div className="planDataContainer">
        <div className="amountSeats">
          <div className="titlesData">
            {t('InstituteOwner.dashboardPlanData.titleCurrentPlan')}
          </div>
          <div className="amount">{`${customer.numberseats} seats`}</div>
          <div className="usingSeats">{`${t(
            'InstituteOwner.dashboardPlanData.usingSeatsUse'
          )} ${teachers.length} ${t(
            'InstituteOwner.dashboardPlanData.usingSeatsOf'
          )} ${customer.numberseats} ${t(
            'InstituteOwner.dashboardPlanData.usingSeats'
          )}`}</div>
          <div className="line">
            <div className="inline" style={{ width: `${usingSeats}%` }}></div>
          </div>
          <Button
            className="buttonsPlanData"
            variant="contained"
            color="secondary"
            disabled={customer.numberseats < teachers.length}
            onClick={() => setOpenInviteMembersPopup(true)}
          >
            {t('InstituteOwner.dashboardPlanData.invitMembersButton')}
          </Button>
        </div>
        <div className="purchaseSeats">
          <div className="titlesData">
            {t('InstituteOwner.dashboardPlanData.titlePurchaseSeats')}
          </div>
          <TextField
            inputProps={{ className: 'textToPurchase' }}
            variant="outlined"
            InputProps={{
              className: 'fieldPurchase',
            }}
            onChange={(e) =>
              setSeatsRequest((e.target as HTMLInputElement).value)
            }
          />
          <Button
            onClick={() =>
              Number(seatsRequest) > 0 ? handleSubmitQuoteRequest() : ''
            }
            className="buttonsPlanData"
            variant="contained"
            color="secondary"
          >
            {t('InstituteOwner.dashboardPlanData.askQuoteButton')}
          </Button>
        </div>
        <div className="bookCall">
          <div className="picture">
            <img src={pictureAnna} className="ImageInBookCall" />
          </div>
          <div className="bodyBookCall">
            {t('InstituteOwner.dashboardPlanData.titleBookCall')}
          </div>
          <Button
            className="buttonsPlanData"
            style={{ width: '170px' }}
            variant="contained"
            color="secondary"
            onClick={() =>
              window.open(
                'https://calendly.com/wizer-anna-rogowska/call-with-wizer-me'
              )
            }
          >
            {t('InstituteOwner.dashboardPlanData.bookCallButton')}
          </Button>
        </div>
      </div>
      <Popup
        cancleButton={false}
        submitButton={false}
        title={t(
          'InstituteOwner.dashboardPlanData.popupAfterQuoteRequestTitle'
        )}
        handleClose={() => handleClose()}
        onSubmit={() => {
          console.log('Submit')
        }}
        open={open}
        classNameDialog="quoteRquestPopup"
        classNameCloseIcon="closeIconPopup"
        classNameTitle="titlePopupQuoteRequest"
      >
        <GroupIcon />
        <div className="popupAfterSubmitQuoteRequest">
          {t('InstituteOwner.dashboardPlanData.popupAfterQuoteRequestSubTitle')}
        </div>
      </Popup>
      <InviteMembersPopup
        openInviteMembersPopup={openInviteMembersPopup}
        openInviteMembersSubmition={openInviteMembersSubmition}
        setEmailsToInvitation={() => setEmailsToInvitation}
        emailsToInvitation={emailsToInvitation}
        handleClose={() => {
          openInviteMembersSubmition
            ? (setOpenInviteMembersPopup(false),
              setOpenInviteMembersSubmition(false))
            : setOpenInviteMembersPopup(false)
          setEmailsToInvitation([])
        }}
        onSubmit={() => {
          openInviteMembersSubmition
            ? (setOpenInviteMembersPopup(false),
              setOpenInviteMembersSubmition(false))
            : (sendInvitation(), setOpenInviteMembersSubmition(true))
        }}
      />
    </>
  )
}
