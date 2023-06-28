import Dialog from '@mui/material/Dialog'
import {IconButton } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import { useTranslation } from 'react-i18next'
import Confetti from '../../../../Auth/firstLoginTeacher/confetti/Confetti'
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
        <DialogContent className="WelcomeToWizerDialogContent">
          <div className="CloseIconContainer">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Confetti />
          <div className="WelcomeToWizerTitle">
            {t('NewCustomer.schoolLinkPopup.title')}
          </div>
            <CopyTextToClipboard color='#FFC046' text={ String(dashboardLink?.link)} />
            <label>{dashboardLink?.link}</label>
          <div>
            <CopyTextToClipboard color='#FFC046' text={ String(dashboardLink?.link)} />
            <label>{dashboardLink?.password}</label>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SchoolLinkPopup
