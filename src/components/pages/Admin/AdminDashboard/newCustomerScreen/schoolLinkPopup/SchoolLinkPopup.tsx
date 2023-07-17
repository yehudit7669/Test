import Dialog from '@mui/material/Dialog'
import { IconButton } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import { useTranslation } from 'react-i18next'
import Confetti from '../../../../../common/confetti/Confetti'
import { CloseIcon } from '../../../../../../assets/svgs/svg-components'
import { CopyTextToClipboard } from '../../../../../common/actions/copyTextToClipBoard/copyTextToClipBoard'

type Props = {
  open: boolean
  handleClose: () => void
  dashboardLink: any
}

const SchoolLinkPopup = ({ open, handleClose, dashboardLink }: Props) => {
  const { t } = useTranslation()
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={'sm'}
        sx={{ '& .MuiDialog-paper': { minHeight: '386px' } }}
      >
        <DialogContent className="PopUpContent">
          <div className="CloseIconContainer">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Confetti />
          <div className="PopUpTitle">
            {t('NewCustomer.schoolLinkPopup.title')}
          </div>
          <div className="subTitle">
            {`Here is the link to   \n`}
            {dashboardLink?.school.schoolName}
          </div>
          <div className="popUpLinkAndPassword">
            <CopyTextToClipboard
              color="#FFC046"
              text={String(dashboardLink?.link)}
            />
            <label>{dashboardLink?.link}</label>
          </div>
          <div className="popUpLinkAndPassword">
            <CopyTextToClipboard
              color="#FFC046"
              text={String(dashboardLink?.link)}
            />
            <label>{dashboardLink?.password}</label>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SchoolLinkPopup
