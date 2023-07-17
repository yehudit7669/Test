import Dialog from '@mui/material/Dialog'
import { Button, IconButton, CircularProgress } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import Confetti from '../../../../common/confetti/Confetti'
import {
  CloseIcon,
  WizerLogoWithNameForDialog,
} from '../../../../../assets/svgs/svg-components'
import '../FirstLoginTeacher.css'
import { useTranslation } from 'react-i18next'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/redux-hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { getFirstLoginTeacherAction } from '../../../../../services/firstLoginTeacher/firstLoginTeacherServices'

type Props = {
  open: boolean
  handleClose: () => void
}

const WelcomeToWizerDialog = ({ open, handleClose }: Props) => {
  const { t } = useTranslation()

  /* Form submission dependencies */
  const { firstLoginTeacherDetails } = useAppSelector(
    (state) => state.firstLoginTeacher
  )
  const [, setError] = useState('')
  const [loading, setLoading] = useState(false)
  /* Form submission dependencies */

  /* Routing, navigation and param dependencies */
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  /* Routing, navigation and param dependencies */

  /* Form submission dependencies */
  const handleSubmitFirstLoginTeacherForm = () => {
    dispatch(
      getFirstLoginTeacherAction(
        firstLoginTeacherDetails,
        navigate,
        setError,
        setLoading
      )
    )
  }
  /* Form submission dependencies */

  return (
    <>
      <Dialog
        className="WelcomeToWizerDialog"
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
            {t('WelcomeToWizerDialog.title')}
          </div>
          <div className="WizerLogo">
            <WizerLogoWithNameForDialog />
          </div>
          <div className="WelcomeToWizerLetsStartButtonContainer">
            <Button
              className="WelcomeToWizerLetsStartButton"
              onClick={handleSubmitFirstLoginTeacherForm}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                t('WelcomeToWizerDialog.letsStart')
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default WelcomeToWizerDialog
