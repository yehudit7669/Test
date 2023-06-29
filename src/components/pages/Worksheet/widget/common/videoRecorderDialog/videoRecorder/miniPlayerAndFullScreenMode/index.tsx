import {
  FullScreenCloseIcon,
  FullScreenOpenIcon,
  MiniPlayerIcon,
} from '../../../../../../../../assets/svgs/svg-components'
import { useVideoRecorderContext } from '../../context/videoRecorderContext'
import { IconButton } from '@mui/material'

/* Sub component - 5 --> Mini player and full screen mode */
export default function RenderMiniPlayerAndFullScreenMode() {
  /* Context dependencies */
  const {
    isMiniPlayerMode,
    setIsMiniPlayerMode,
    liveVideoFeed,
    setIsFullScreenMode,
  } = useVideoRecorderContext()
  /* Context dependencies */

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
      <IconButton className="Mini_Player_Btn" onClick={handleToggleMiniPlayer}>
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
/* Sub component - 5 --> Mini player and full screen mode */
