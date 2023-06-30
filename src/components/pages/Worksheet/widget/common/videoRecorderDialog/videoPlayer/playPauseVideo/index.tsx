import { useVideoPlayerContext } from '../../context/videoPlayerContext/VideoPlayerContext'
import '../VideoPlayer.css'
import { forwardRef } from 'react'

type Props = {
  isStandAloneVideoPlayer: boolean
}

const RenderPlayPauseVideo = forwardRef(
  ({ isStandAloneVideoPlayer }: Props, ref) => {
    /* Context dependencies */
    const { videoPlayerRef } = useVideoPlayerContext()
    /* Context dependencies */

    /* Function definition to play and pause video player */
    const handlePlayPauseToggleButton = () => {
      let tempRef
      if (isStandAloneVideoPlayer) {
        tempRef = ref
      } else {
        tempRef = videoPlayerRef
      }
      tempRef.current.paused ? tempRef.current.play() : tempRef.current.pause()
    }
    /* Function definition to play and pause video player */

    return (
      <>
        <button
          className="Play_Pause_Btn"
          onClick={handlePlayPauseToggleButton}
        >
          <svg className="Play_Icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
          </svg>
          <svg className="Pause_Icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
          </svg>
        </button>
      </>
    )
  }
)

export default RenderPlayPauseVideo
