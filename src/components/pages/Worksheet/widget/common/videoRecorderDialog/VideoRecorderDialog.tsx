import Dialog from '@mui/material/Dialog'
import { DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import { DialogContent } from '@mui/material'
import { CloseIconForRecorder } from '../../../../../../assets/svgs/svg-components'
import React, { useState } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import Zoom from '@mui/material/Zoom'
import Uploader from '../../../../../common/uploader'
import { useTranslation } from 'react-i18next'
import VideoRecorder from './videoRecorder'
import { useTimer } from '../../../../../../hooks/useRecordAudioTimer'
import VideoPlayer from './videoPlayer'
import './VideoRecorderDialog.css'

type Props = {
  open: boolean
  handleClose: () => void
}

/* Apply transition of zoom effect when the dialog opens and closes - Dialog dependencies */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom timeout={500} in ref={ref} {...props} />
})
/* Apply transition of zoom effect when the dialog opens and closes - Dialog dependencies */

const VideoRecorderDialog = ({ open, handleClose }: Props) => {
  /* i18n dependencies */
  const { t } = useTranslation()
  /* i18n dependencies */

  /* Video recorder dependencies */
  const [recordedVideo, setRecordedVideo] = useState<string>('')
  const {
    duration: recordVideoDuration,
    handleStart: handleStartVideoRecording,
    handlePause: handlePauseVideoRecording,
  } = useTimer(0)
  const [loading] = useState(false)
  /* Video recorder dependencies */

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
    setRecordedVideo('')
  }
  /* Dialog close dependencies */

  return (
    <>
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
              {!recordedVideo || recordedVideo === '' ? (
                <VideoRecorder
                  recordVideoDuration={recordVideoDuration}
                  setRecordedVideo={setRecordedVideo}
                  handleStartVideoRecording={handleStartVideoRecording}
                  handlePauseVideoRecording={handlePauseVideoRecording}
                />
              ) : (
                <VideoPlayer
                  recordVideoDuration={recordVideoDuration}
                  isStandAloneVideoPlayer={false}
                  videoSrc={recordedVideo}
                />
              )}
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
    </>
  )
}

export default VideoRecorderDialog
