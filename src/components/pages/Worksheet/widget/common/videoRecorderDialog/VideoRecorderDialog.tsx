import Dialog from '@mui/material/Dialog'
import { DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import { DialogContent } from '@mui/material'
import { CloseIconForRecorder } from '../../../../../../assets/svgs/svg-components'
import React from 'react'
import { TransitionProps } from '@mui/material/transitions'
import Zoom from '@mui/material/Zoom'
import './VideoRecorderDialog.css'
import Uploader from '../../../../../common/uploader'
import { useTranslation } from 'react-i18next'
import VideoRecorderContextProvider from './context/videoRecorderContext'
import { useVideoRecorderContext } from './context/videoRecorderContext'
import VideoPlayerContextProvider from './context/videoPlayerContext'
import VideoRecorder from './videoRecorder'
import VideoPlayer from './videoPlayer'

type Props = {
  open: boolean
  handleClose: () => void
}

/* Apply transition of zoom effect when the dialog opens and closes - Dialog dependencies */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Zoom timeout={500} in ref={ref} {...props} />
})
/* Apply transition of zoom effect when the dialog opens and closes - Dialog dependencies */

const VideoRecorderDialog = ({ open, handleClose }: Props) => {
  /* i18n dependencies */
  const { t } = useTranslation()
  /* i18n dependencies */

  const {
    setPermission,
    loading,
    setRecordingStatus,
    setRecordedVideo,
    handleResetVideoRecording,
    setMediaRecorderState,
  } = useVideoRecorderContext()
  /***** Dialog title dependencies *****/
  const RenderDialogTitle = () => {
    return (
      <>
        <DialogTitle
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <div>
            <Typography className="RecordVideoText">
              {t('VideoRecorder.header')}
            </Typography>
          </div>
          <div className="">
            <IconButton onClick={onDialogClose}>
              <CloseIconForRecorder />
            </IconButton>
          </div>
        </DialogTitle>
      </>
    )
  }

  const RenderDialogHeaderDescription = () => {
    return (
      <>
        <div className="VideoFileDescription">
          {t('VideoRecorder.videoFileDescription')}{' '}
        </div>
      </>
    )
  }
  /***** Dialog title dependencies *****/

  /* Dialog close dependencies */
  const onDialogClose = () => {
    handleClose()
    setPermission(false)
    setRecordingStatus('inactive')
    setRecordedVideo('')
    handleResetVideoRecording()
    setMediaRecorderState('resumed')
  }
  /* Dialog close dependencies */

  return (
    <>
      <VideoRecorderContextProvider>
        <VideoPlayerContextProvider>
          <Dialog
            className="VideoRecorderDialog"
            open={open}
            onClose={onDialogClose}
            fullWidth
            TransitionComponent={Transition}
            maxWidth={'sm'}
          >
            <RenderDialogTitle />
            <DialogContent>
              {!loading && (
                <>
                  <Stack spacing={2} display="flex" alignItems="center">
                    <RenderDialogHeaderDescription />
                  </Stack>
                  <VideoRecorder />
                  <VideoPlayer isStandAloneVideoPlayer={false} videoSrc={''} />
                  <Stack
                    spacing={1}
                    display="flex"
                    justifyContent="end"
                    flexDirection="row"
                  >
                    {/* <Button color="primary" variant="contained">
                      Upload
                    </Button>
                    <Button variant="contained">
                      Cancel
                    </Button> */}
                  </Stack>
                </>
              )}

              {loading && (
                <Stack>
                  <Uploader />
                </Stack>
              )}
            </DialogContent>
          </Dialog>
        </VideoPlayerContextProvider>
      </VideoRecorderContextProvider>
    </>
  )
}

export default VideoRecorderDialog
