import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import PauseIcon from '@mui/icons-material/Pause'
import { IconButton } from '@mui/material'
import { useVideoRecorderContext } from '../../context/videoRecorderContext'
import { red } from '@mui/material/colors'

/* Sub component - 3 --> Pause And Resume recording */
export default function RenderPauseResumeRecording() {
  /* Context dependencies */
  const {
    mediaRecorder,
    mediaRecorderState,
    setMediaRecorderState,
    handlePauseVideoRecording,
    handleStartVideoRecording,
  } = useVideoRecorderContext()
  /* Context dependencies */

  /* Function definition to pause or resume recording */
  const pauseOrResumeRecording = () => {
    if (mediaRecorderState === 'paused') {
      mediaRecorder.current.resume()
      handleStartVideoRecording()
      setMediaRecorderState('resumed')
    } else {
      mediaRecorder.current.pause()
      handlePauseVideoRecording()
      setMediaRecorderState('paused')
    }
  }
  /* Function definition to pause or resume recording */
  return (
    <>
      <IconButton className="Pause_Btn" onClick={pauseOrResumeRecording}>
        {mediaRecorderState === 'resumed' ? (
          <PauseIcon className="Pause_Icon" sx={{ color: 'white' }} />
        ) : (
          <RadioButtonCheckedIcon
            className="Record_Icon"
            sx={{ color: red[500] }}
          />
        )}
      </IconButton>
    </>
  )
}
/* Sub component - 3 --> Pause And Resume recording */
