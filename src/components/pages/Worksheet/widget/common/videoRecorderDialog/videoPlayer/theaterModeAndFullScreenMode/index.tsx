import { useVideoPlayerContext } from '../../context/videoPlayerContext'
import '../VideoPlayer.css'

export default function RenderTheaterModeAndFullScreenMode() {
  /* Context dependencies */
  const {
    videoPlayerContainerRef,
    setIsVideoPlayerTheaterMode,
    setIsVideoPlayerFullScreenMode,
  } = useVideoPlayerContext()
  /* Context dependencies */

  /* Function definition to toggle theater mode */
  const handleToggleTheaterMode = () => {
    setIsVideoPlayerTheaterMode()
  }
  /* Function definition to toggle theater mode */

  /* Function definition to toggle full screen mode */
  const handleToggleFullScreenMode = () => {
    console.log('document.fullscreenEnabled', document.fullscreenEnabled)
    if (document.fullscreenElement === null) {
      videoPlayerContainerRef.current
        .requestFullscreen()
        .then(() => {
          console.log('full screen done')
        })
        .catch((err: any) => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          )
        })
      console.log(
        videoPlayerContainerRef.current.requestFullscreen(),
        'videoPlayerContainerRef.current.requestFullscreen'
      )
    } else {
      document.exitFullscreen()
    }
    setIsVideoPlayerFullScreenMode()
  }
  /* Function definition to toggle full screen mode */

  return (
    <>
      <button className="Theater_Btn" onClick={handleToggleTheaterMode}>
        <svg className="Tall_Icon" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
          />
        </svg>
        <svg className="Wide_Icon" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
          />
        </svg>
      </button>
      <button className="Full_Screen_Btn" onClick={handleToggleFullScreenMode}>
        <svg className="Open_Icon" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
          />
        </svg>
        <svg className="Close_Icon" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
          />
        </svg>
      </button>
    </>
  )
}
