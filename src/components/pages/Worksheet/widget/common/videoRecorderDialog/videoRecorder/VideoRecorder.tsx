import { IconButton } from '@mui/material'
import {
  FullScreenCloseIcon,
  FullScreenOpenIcon,
  MiniPlayerIcon,
  RecordAudioIcon,
} from '../../../../../../../assets/svgs/svg-components'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { red } from '@mui/material/colors'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'
import { formatTime } from '../../../../../../../hooks/useRecordAudioTimer'
import { useState, useRef, Dispatch, SetStateAction } from 'react'
import './VideoRecorder.css'

type Props = {
  setRecordedVideo: Dispatch<SetStateAction<string>>
  recordVideoDuration: number
  handleStartVideoRecording: () => void
  handlePauseVideoRecording: () => void
}

/* Main component for Video Recorder */
export default function VideoRecorder({
  setRecordedVideo,
  recordVideoDuration,
  handleStartVideoRecording,
  handlePauseVideoRecording,
}: Props) {
  const mimeType = 'video/webm'
  /* Record audio dependencies */
  const mediaRecorder = useRef<any>(null)
  const liveVideoFeed = useRef<any>(null)
  const [permission, setPermission] = useState(false)
  const [stream, setStream] = useState<any>(null)
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [videoChunks, setVideoChunks] = useState<any[]>([])

  /* Video recording features dependencies */
  const [mediaRecorderState, setMediaRecorderState] = useState('resumed')
  const [isMiniPlayerMode, setIsMiniPlayerMode] = useState(false)
  const [isFullScreenMode, setIsFullScreenMode] = useState(false)
  /* Video recording features dependencies */

  /* Record audio dependencies */

  /**** Video Recorder --> Phase 1 - Get permissions *****/
  const RenderGetPermissions = () => {
    /* Function definition to Get permissions to record a video */
    const handleGetPermissions = async () => {
      setRecordedVideo('')
      if ('MediaRecorder' in window) {
        try {
          const videoConstraints = {
            audio: false,
            video: true,
          }
          const audioConstraints = { audio: true }
          // create audio and video streams separately
          const audioStream = await navigator.mediaDevices.getUserMedia(
            audioConstraints
          )
          const videoStream = await navigator.mediaDevices.getUserMedia(
            videoConstraints
          )
          setPermission(true)
          //combine both audio and video streams
          const combinedStream = new MediaStream([
            ...videoStream.getVideoTracks(),
            ...audioStream.getAudioTracks(),
          ])
          setStream(combinedStream)
          //set videostream to live feed player
          liveVideoFeed.current.srcObject = videoStream
        } catch (err: any) {
          alert(err?.message)
        }
      } else {
        alert('The MediaRecorder API is not supported in your browser.')
      }
    }
    /* Function definition to Get permissions to record a video */
    return (
      <>
        <div className="GetPermissions_Container">
          <IconButton
            className="RecordIcon_Button"
            onClick={handleGetPermissions}
          >
            <div className="RecordIcon_Container">
              <RecordAudioIcon />
            </div>
          </IconButton>
        </div>
      </>
    )
  }
  /**** Video Recorder --> Phase 1 - Get permissions *****/

  /**** Video Recorder --> Phase 2 - Start recording *****/
  const RenderStartRecording = () => {
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
  /**** Video Recorder --> Phase 2 - Start recording *****/

  /**** Video Recorder --> Phase 3 - Pause and resume recording *****/
  const RenderPauseResumeRecording = () => {
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
  /**** Video Recorder --> Phase 3 - Pause and resume recording *****/

  /**** Video Recorder --> Phase 4 - Stop recording *****/
  const RenderStopRecording = () => {
    /* Function definition to stop the recording */
    const stopRecording = () => {
      setPermission(false)
      setRecordingStatus('inactive')
      handlePauseVideoRecording()
      mediaRecorder.current.stop()
      // mediaRecorder.current.src = "";
      // liveVideoFeed.current.srcObject.getTracks()[0].stop();
      mediaRecorder.current.onstop = () => {
        const videoBlob = new Blob(videoChunks, { type: mimeType })
        const videoUrl = URL.createObjectURL(videoBlob)
        console.log(videoUrl, 'videoUrl')
        setRecordedVideo(videoUrl)
        setVideoChunks([])
      }
    }
    /* Function definition to stop the recording */
    return (
      <>
        <IconButton className="Stop_Btn" onClick={stopRecording}>
          <StopIcon className="Stop_Icon" sx={{ color: 'white' }} />
        </IconButton>
      </>
    )
  }
  /**** Video Recorder --> Phase 4 - Stop recording *****/

  /**** Video Recorder --> Phase 5 - Recording duration *****/
  const RenderRecordingDuration = () => {
    return (
      <>
        <div className="Duration_Container">
          <div className="Current_Time">{formatTime(recordVideoDuration)}</div>
          <div className="Current_Time"></div>
        </div>
      </>
    )
  }
  /**** Video Recorder --> Phase 5 - Recording duration *****/

  /**** Video Recorder --> Phase 6 - Recording duration *****/
  const RenderMiniPlayerAndFullScreenMode = () => {
    /* Function definition to toggle mini player */
    const handleToggleMiniPlayer = () => {
      if (isMiniPlayerMode) {
        document.exitPictureInPicture()
      } else {
        liveVideoFeed.current.requestPictureInPicture()
      }
      setIsMiniPlayerMode((prevValue) => !prevValue)
    }
    /* Function definition to toggle mini player */

    /* Function definition to toggle full screen mode */
    const handleToggleFullScreenMode = () => {
      if (document.fullscreenElement === null) {
        liveVideoFeed.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
      setIsFullScreenMode(!!document.fullscreenElement)
    }
    /* Function definition to toggle full screen mode */
    return (
      <>
        <IconButton
          className="Mini_Player_Btn"
          onClick={handleToggleMiniPlayer}
        >
          <MiniPlayerIcon />
        </IconButton>
        <IconButton
          className="Full_Screen_Btn"
          onClick={handleToggleFullScreenMode}
        >
          <FullScreenOpenIcon />
          <FullScreenCloseIcon />
        </IconButton>
      </>
    )
  }
  /**** Video Recorder --> Phase 6 - Recording duration *****/

  return (
    <>
      <div className="Video_Recorder_Container">
        <video ref={liveVideoFeed} autoPlay className="Video_Recorder" />
        {!permission ? (
          <RenderGetPermissions />
        ) : (
          <div
            className={`Controls_Container ${
              isFullScreenMode ? 'full-screen' : ''
            }`}
          >
            {recordingStatus === 'inactive' && <RenderStartRecording />}
            <div
              className={`Recording_Btn_Container ${
                recordingStatus === 'recording' ? 'show-recording-btn' : ''
              }`}
            >
              <RenderPauseResumeRecording />
              <RenderStopRecording />
            </div>
            <RenderRecordingDuration />
            <RenderMiniPlayerAndFullScreenMode />
          </div>
        )}
      </div>
    </>
  )
}
/* Main component for Video Recorder */
