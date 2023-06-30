import { formatTime } from '../../../../../../../../hooks/useRecordAudioTimer'
import { useVideoRecorderContext } from '../../context/videoRecorderContext/VideoRecorderContext'

/* Sub component - 6 --> Recording Duration */
export default function RenderRecordingDuration() {
  /* Context dependencies */
  const { recordVideoDuration } = useVideoRecorderContext()
  /* Context dependencies */

  return (
    <>
      <div className="Duration_Container">
        <div className="Current_Time">{formatTime(recordVideoDuration)}</div>
        <div className="Current_Time"></div>
      </div>
    </>
  )
}
/* Sub component - 6 --> Recording Duration */
