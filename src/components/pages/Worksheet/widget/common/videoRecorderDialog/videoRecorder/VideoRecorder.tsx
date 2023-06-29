import { useVideoRecorderContext } from '../context/videoRecorderContext'
import './VideoRecorder.css'
import RenderGetPermissions from './getPermissions'
import RenderStartRecording from './startRecording'
import RenderPauseResumeRecording from './pauseResumeRecording'
import RenderStopRecording from './stopRecording'
import RenderRecordingDuration from './recordingDuration'
import RenderMiniPlayerAndFullScreenMode from './miniPlayerAndFullScreenMode'

/* Main component for Video Recorder */
export default function VideoRecorder() {
  /* Context dependencies */
  const {
    permission,
    liveVideoFeed,
    recordingStatus,
    isFullScreenMode,
    recordedVideo,
  } = useVideoRecorderContext()
  /* Context dependencies */

  return (
    <>
      {!recordedVideo ? (
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
      ) : null}
    </>
  )
}
/* Main component for Video Recorder */
