import { useVideoRecorderContext } from '../../context/videoRecorderContext'
import { IconButton } from '@mui/material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { red } from '@mui/material/colors'

/* Sub component - 2 --> Start recording */
export default function RenderStartRecording() {
  /* Context dependencies */
  const {
    setRecordingStatus,
    handleStartVideoRecording,
    stream,
    mediaRecorder,
    mimeType,
    setVideoChunks,
  } = useVideoRecorderContext()
  /* Context dependencies */

  /* Function definition to start recording the video */
  const startRecording = async () => {
    setRecordingStatus('recording')
    handleStartVideoRecording()
    const media = new MediaRecorder(stream, { mimeType })
    mediaRecorder.current = media
    mediaRecorder.current.start()
    const localVideoChunks: any[] = []
    mediaRecorder.current.ondataavailable = (event: any) => {
      if (typeof event.data === 'undefined') return
      if (event.data.size === 0) return
      localVideoChunks.push(event.data)
    }
    setVideoChunks(localVideoChunks)
  }
  /* Function definition to start recording the video */

  return (
    <>
      <IconButton className="Record_Btn" onClick={startRecording}>
        <RadioButtonCheckedIcon
          className="Record_Icon"
          sx={{ color: red[500] }}
        />
      </IconButton>
    </>
  )
}
/* Sub component - 2 --> Start recording */
