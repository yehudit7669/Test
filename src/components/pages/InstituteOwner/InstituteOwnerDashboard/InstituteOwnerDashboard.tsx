import Button from '@mui/material/Button'
import AdminMainLayout from '../../../layouts/AdminMainLayout'
import MembersList from './membersList/MembersList'
import './InstituteOwnerDashboard.css'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import InstituteOwnerPlanData from './bokData/InstituteOwnerPlanData'
import { getTeachersBySchoolId } from '../../../../services/teacher/teacherServices'
import InviteMembersPopup from './inviteMembersPopup/InviteMembersPopup'
import {
  sendInvitationsAction,
  getCustomerByEmail,
} from '../../../../services/customer/customerServices'
import useUser from '../../../../hooks/useUser'
import { useTranslation } from 'react-i18next'
import Loader from '../../../common/loader'

function InstituteOwnerDashboard() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { teachers } = useAppSelector((state: any) => state.teacher)
  const { customer } = useAppSelector((state: any) => state.customer)
  const [openInviteMembersPopup, setOpenInviteMembersPopup] = useState(false)
  const [openInviteMembersSubmition, setOpenInviteMembersSubmition] =
    useState(false)
  const [emailsToInvitation, setEmailsToInvitation] = useState<Array<string>>(
    []
  )
  const [user] = useUser()

  useEffect(() => {
    dispatch(getCustomerByEmail(setError, setLoading, user?.email ?? ''))
  }, [dispatch, user?.email])

  useEffect(() => {
    dispatch(getTeachersBySchoolId(customer.id, setError, setLoading))
  }, [dispatch, customer.id])

  if (loading) {
    return (
      <div className="Worksheet-container-loader">
        <Loader />
      </div>
    )
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
    <div className="InstituteOwnerDashboard">
      <AdminMainLayout />
      <div className="InstituteOwnerDashboardContainer">
        {teachers ? (
          <>
            <div
              className="newDeal"
              onClick={() => setOpenInviteMembersPopup(true)}
            >
              <Button
                variant="contained"
                className="buttonNewDeal"
                disabled={customer.numberseats < teachers.length}
              >
                {t('InstituteOwner.dashboard.buttonInviteMembers')}
              </Button>
            </div>
            <h1 className="InstituteOwnerTitle" style={{ marginTop: '-60px' }}>
              {customer.schoolname}
            </h1>
            <h2 className="InstituteOwnerSubTitle">
              {t('InstituteOwner.dashboard.titleByOwnerName')}{' '}
              {customer.firstname}
            </h2>
            <MembersList />
          </>
        ) : (
          <div className="withoutTeachersContainer">
            <h1 className="InstituteOwnerTitle">{customer.schoolname}</h1>
            <h2 className="InstituteOwnerSubTitle">
              {t('InstituteOwner.dashboard.titleForNoneTeachers')}
            </h2>
            <h2 className="InstituteOwnerThirdTitle">
              {t('InstituteOwner.dashboard.subTitleForNoneTeachers')}
            </h2>
            <Button
              className="buttonInvite"
              variant="contained"
              onClick={() => setOpenInviteMembersPopup(true)}
            >
              {t('InstituteOwner.dashboard.buttonInviteMembers')}
            </Button>
          </div>
        )}
        <InstituteOwnerPlanData />
      </div>
      <InviteMembersPopup
        openInviteMembersPopup={openInviteMembersPopup}
        openInviteMembersSubmition={openInviteMembersSubmition}
        setEmailsToInvitation={() => setEmailsToInvitation}
        emailsToInvitation={emailsToInvitation}
        handleClose={() => {
          openInviteMembersSubmition
            ? (setOpenInviteMembersSubmition(false),
              setOpenInviteMembersPopup(false))
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
    </div>
  )
}
export default InstituteOwnerDashboard
