import { useVideoPlayerContext } from '../../context/videoPlayerContext/VideoPlayerContext'
import { forwardRef } from 'react'

type Props = {
  isStandAloneVideoPlayer: boolean
}

const RenderVideoPlaybackSpeedAndMiniPlayer = forwardRef(
  ({ isStandAloneVideoPlayer }: Props, ref) => {
    /* Context dependencies */
    const {
      videoPlayerPlaybackSpeed,
      setVideoPlayerPlaybackSpeed,
      isVideoPlayerMiniMode,
      setIsVideoPlayerMiniMode,
      videoPlayerRef,
    } = useVideoPlayerContext()

    /* Context dependencies */

    /* Function definition to change the playback speed */
    const handleChangePlaybackSpeed = () => {
      let tempRef
      if (isStandAloneVideoPlayer) {
        tempRef = ref
      } else {
        tempRef = videoPlayerRef
      }
      let newPlaybackSpeed = tempRef.current.playbackRate + 0.25
      if (newPlaybackSpeed > 2) newPlaybackSpeed = 0.25
      tempRef.current.playbackRate = newPlaybackSpeed
      setVideoPlayerPlaybackSpeed(`${newPlaybackSpeed}x`)
    }
    /* Function definition to change the playback speed */

    /* Function definition to toggle the mini player button */
    const handleToggleMiniPlayer = () => {
      let tempRef
      if (isStandAloneVideoPlayer) {
        tempRef = ref
      } else {
        tempRef = videoPlayerRef
      }
      if (isVideoPlayerMiniMode) {
        document.exitPictureInPicture()
      } else {
        tempRef.current.requestPictureInPicture()
      }
      setIsVideoPlayerMiniMode()
    }
    /* Function definition to toggle the mini player button */

    return (
      <>
        <button
          className="Speed_Btn wide-btn"
          onClick={handleChangePlaybackSpeed}
        >
          {videoPlayerPlaybackSpeed}
        </button>
        <button className="Mini_Player_Btn" onClick={handleToggleMiniPlayer}>
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
            />
          </svg>
        </button>
      </>
    )
  }
)

export default RenderVideoPlaybackSpeedAndMiniPlayer
