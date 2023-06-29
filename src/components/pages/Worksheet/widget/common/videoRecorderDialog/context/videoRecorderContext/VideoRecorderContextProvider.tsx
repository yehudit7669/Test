import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useRef,
} from 'react'
import { useTimer } from '../../../../../../../../hooks/useRecordAudioTimer'

type IVideoRecorderContext = {
  permission: boolean
  setPermission: Dispatch<SetStateAction<boolean>>
  stream: any
  setStream: Dispatch<SetStateAction<any>>
  videoChunks: any[]
  setVideoChunks: Dispatch<SetStateAction<any[]>>
  isMiniPlayerMode: boolean
  setIsMiniPlayerMode: Dispatch<SetStateAction<boolean>>
  isFullScreenMode: boolean
  setIsFullScreenMode: Dispatch<SetStateAction<boolean>>
  recordingStatus: string
  setRecordingStatus: Dispatch<SetStateAction<string>>
  mediaRecorder: any
  videoRef: any
  liveVideoFeed: any
  mediaRecorderState: string
  setMediaRecorderState: Dispatch<SetStateAction<string>>
  recordedVideo: string
  setRecordedVideo: Dispatch<SetStateAction<string>>
  mimeType: string
  recordVideoDuration: number
  handleStartVideoRecording: () => void
  handlePauseVideoRecording: () => void
  handleResetVideoRecording: () => void
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const initialState = {
  permission: false,
  setPermission: () => undefined,
  stream: null,
  setStream: () => undefined,
  videoChunks: [],
  setVideoChunks: () => undefined,
  isMiniPlayerMode: false,
  setIsMiniPlayerMode: () => undefined,
  isFullScreenMode: false,
  setIsFullScreenMode: () => undefined,
  recordingStatus: 'inactive',
  setRecordingStatus: () => undefined,
  mediaRecorder: null,
  videoRef: null,
  liveVideoFeed: null,
  mediaRecorderState: 'resumed',
  setMediaRecorderState: () => undefined,
  recordedVideo: '',
  setRecordedVideo: () => undefined,
  mimeType: 'video/webm',
  recordVideoDuration: 0,
  handleStartVideoRecording: () => undefined,
  handlePauseVideoRecording: () => undefined,
  handleResetVideoRecording: () => undefined,
  loading: false,
  setLoading: () => undefined,
}
export const VideoRecorderContext = createContext<IVideoRecorderContext | null>(
  initialState
)

type Props = {
  children: React.ReactNode
}
export const VideoRecorderContextProvider = ({ children }: Props) => {
  const mimeType = 'video/webm'
  /* Record audio dependencies */
  const [permission, setPermission] = useState(false)
  const [stream, setStream] = useState<any>(null)
  const mediaRecorder = useRef<any>(null)
  const videoRef = useRef<any>(null)
  const liveVideoFeed = useRef<any>(null)
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [videoChunks, setVideoChunks] = useState<any[]>([])
  const [recordedVideo, setRecordedVideo] = useState<string>('')
  const [loading, setLoading] = useState(false)

  /* Video recording features dependencies */
  const [mediaRecorderState, setMediaRecorderState] = useState('resumed')
  const [isMiniPlayerMode, setIsMiniPlayerMode] = useState(false)
  const [isFullScreenMode, setIsFullScreenMode] = useState(false)
  /* Video recording features dependencies */

  const {
    duration: recordVideoDuration,
    handleStart: handleStartVideoRecording,
    handlePause: handlePauseVideoRecording,
    handleReset: handleResetVideoRecording,
  } = useTimer(0)
  /* Record audio dependencies */

  return (
    <>
      <VideoRecorderContext.Provider
        value={{
          permission,
          setPermission,
          stream,
          setStream,
          videoChunks,
          setVideoChunks,
          isMiniPlayerMode,
          setIsMiniPlayerMode,
          isFullScreenMode,
          setIsFullScreenMode,
          recordingStatus,
          setRecordingStatus,
          mediaRecorder,
          videoRef,
          liveVideoFeed,
          mediaRecorderState,
          setMediaRecorderState,
          recordedVideo,
          setRecordedVideo,
          mimeType,
          recordVideoDuration,
          handleStartVideoRecording,
          handlePauseVideoRecording,
          handleResetVideoRecording,
          loading,
          setLoading,
        }}
      >
        {children}
      </VideoRecorderContext.Provider>
    </>
  )
}
