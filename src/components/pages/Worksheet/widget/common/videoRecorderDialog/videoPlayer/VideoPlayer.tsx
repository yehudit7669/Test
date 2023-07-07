import { useRef, useState } from 'react'
import './VideoPlayer.css'
import {
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeMutedIcon,
} from '../../../../../../../assets/svgs/svg-components'
import { IconButton } from '@mui/material'

type Props = {
  videoSrc: string | undefined
  isStandAloneVideoPlayer: boolean
  recordVideoDuration: number
}

function VideoPlayer({
  videoSrc,
  isStandAloneVideoPlayer,
  recordVideoDuration,
}: Props) {
  const [isVideoPaused, setIsVideoPaused] = useState(true)
  const [isFullScreenMode, setIsFullScreenMode] = useState(false)
  const [isMiniPlayerMode, setIsMiniPlayerMode] = useState(false)
  const videoPlayerRef = useRef<any>(null)
  const videoContainerRef = useRef<any>(null)
  const timelineContainerRef = useRef<any>(null)
  const [volumeType, setVolumeType] = useState('high')
  const [volumeSliderValue, setVolumeSliderValue] = useState<
    string | number | undefined
  >()
  const [totalTime, setTotalTime] = useState<number | string>()
  const [currentTime, setCurrentTime] = useState<number | string>('00:00')
  const [playbackSpeed, setPlaybackSpeed] = useState('1x')

  /* Function definition for toggle scrubbing and timeline change */
  const toggleScrubbing = (e: React.MouseEvent) => {
    let wasPaused
    const rect = timelineContainerRef.current.getBoundingClientRect()
    const percent =
      Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
    videoPlayerRef.current.currentTime =
      percent * videoPlayerRef.current.duration
    if (!wasPaused) videoPlayerRef.current.play()
    handleTimelineChange(e)
  }

  const handleTimelineChange = (e: React.MouseEvent) => {
    e.preventDefault()
    const rect = timelineContainerRef.current.getBoundingClientRect()
    const percent =
      Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
    timelineContainerRef.current.style.setProperty(
      '--preview-position',
      percent
    )
  }
  /* Function definition for toggle scrubbing and timeline change */

  /* Function definition to Toggle play button */
  const handleToggleVolumeButton = () => {
    videoPlayerRef.current.muted = !videoPlayerRef.current.muted
  }
  /* Function definition to Toggle play button */

  /* Function definition to change the slider value on volume change */
  const handleVolumeSliderChange = (e: React.SyntheticEvent) => {
    videoPlayerRef.current.volume = (e.target as HTMLInputElement).value
    videoPlayerRef.current.muted = (e.target as HTMLInputElement).value === '0'
    setVolumeSliderValue(videoPlayerRef.current.volume)
  }
  /* Function definition to change the slider value on volume change */

  /* Function definition to handle change playbackspeed */
  const handleChangePlaybackSpeed = () => {
    let newPlaybackSpeed = videoPlayerRef.current.playbackRate + 0.25
    if (newPlaybackSpeed > 2) newPlaybackSpeed = 0.25
    videoPlayerRef.current.playbackRate = newPlaybackSpeed
    setPlaybackSpeed(`${newPlaybackSpeed}x`)
  }
  /* Function definition to handle change playbackspeed */

  /* Function definition to handle toggle mini player */
  const handleToggleMiniPlayer = () => {
    if (isMiniPlayerMode) {
      document.exitPictureInPicture()
    } else {
      videoPlayerRef.current.requestPictureInPicture()
    }
    setIsMiniPlayerMode((prevValue) => !prevValue)
  }
  /* Function definition to handle toggle mini player */

  /* Function definition to Toggle full screen mode */
  const handleToggleFullScreenMode = () => {
    if (document.fullscreenElement === null) {
      videoContainerRef.current.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullScreenMode((prevValue) => !prevValue)
  }
  /* Function definition to Toggle full screen mode */

  /* Function definition for Play pause toggle */
  const handlePlayPauseToggleButton = () => {
    videoPlayerRef.current.paused
      ? videoPlayerRef.current.play()
      : videoPlayerRef.current.pause()
  }
  /* Function definition for Play pause toggle */

  const handleVolumeChanged = () => {
    setVolumeSliderValue(videoPlayerRef.current.volume)
    let volumeLevel
    if (videoPlayerRef.current.volume === '0' || videoPlayerRef.current.muted) {
      setVolumeSliderValue('0')
      volumeLevel = 'muted'
    } else if (videoPlayerRef.current.volume >= '0.5') {
      volumeLevel = 'high'
    } else {
      volumeLevel = 'low'
    }
    setVolumeType(volumeLevel)
  }

  /* On data load - set the duration of the video */
  const handleDataLoaded = (event: any) => {
    setVolumeSliderValue(event.target?.volume)
    if (event.target?.duration !== Infinity && !isNaN(event.target.duration)) {
      setTotalTime(formatDuration(event.target.duration))
      setCurrentTime(formatDuration(event.target.currentTime))
    } else {
      setTotalTime('00:00')
    }
    if (!isStandAloneVideoPlayer) {
      setTotalTime(formatDuration(recordVideoDuration))
    }
  }
  /* On data load - set the duration of the video */

  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  })

  const formatDuration = (time: number) => {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)

    if (hours === 0) {
      return `${leadingZeroFormatter.format(
        minutes
      )}:${leadingZeroFormatter.format(seconds)}`
    } else {
      return `${leadingZeroFormatter.format(
        hours
      )}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(
        seconds
      )}`
    }
  }

  /* Function definition to change the position of the slider on time change or time update */
  const handleTimeUpdate = (event: any) => {
    if (event.target?.duration !== Infinity && !isNaN(event.target.duration)) {
      setTotalTime(formatDuration(event.target.duration))
      setCurrentTime(formatDuration(event.target.currentTime))
      const percent = event.target.currentTime / event.target.duration
      timelineContainerRef.current.style.setProperty(
        '--progress-position',
        percent
      )
    } else {
      setTotalTime('00:00')
    }
    if (!isStandAloneVideoPlayer) {
      setTotalTime(formatDuration(recordVideoDuration))
    }
  }
  /* Function definition to change the position of the slider on time change or time update */

  return (
    <div
      ref={videoContainerRef}
      className={`Video_Container ${isMiniPlayerMode ? 'mini-player' : ''} ${
        isFullScreenMode ? 'full-screen' : ''
      } 
      ${isVideoPaused ? 'paused' : ''}`}
    >
      <div className="Video_Controls_Container">
        {/* Render time line */}
        <div
          className="Timeline_Container"
          ref={timelineContainerRef}
          onMouseMove={(e) => handleTimelineChange(e)}
          onMouseDown={toggleScrubbing}
        >
          <div className="Timeline">
            <div className="Thumb_Indicator"></div>
          </div>
        </div>
        {/* Render time line */}

        <div className="Controls_Container">
          {/* RenderPlayPauseVideo */}
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
          {/* RenderPlayPauseVideo */}

          {/* RenderVolumeControls */}
          <div className="Volume_Container">
            <IconButton className="Mute_Btn" onClick={handleToggleVolumeButton}>
              {volumeType === 'high' ? (
                <VolumeHighIcon />
              ) : volumeType === 'low' ? (
                <VolumeLowIcon />
              ) : volumeType === 'muted' ? (
                <VolumeMutedIcon />
              ) : null}
            </IconButton>
            <input
              className="Volume_Slider"
              type="range"
              min={0}
              max={1}
              step="any"
              value={volumeSliderValue}
              onChange={handleVolumeSliderChange}
            />
          </div>
          {/* RenderVolumeControls */}

          {/* RenderVideoDuration */}
          <div className="Duration_Container">
            <div className="Current_Time">{currentTime}</div>/
            <div className="Total_Time">{totalTime}</div>
          </div>
          {/* RenderVideoDuration */}

          {/* RenderVideoPlaybackSpeedAndMiniPlayer */}
          <button
            className="Speed_Btn wide-btn"
            onClick={handleChangePlaybackSpeed}
          >
            {playbackSpeed}
          </button>
          <button className="Mini_Player_Btn" onClick={handleToggleMiniPlayer}>
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
              />
            </svg>
          </button>
          {/* RenderVideoPlaybackSpeedAndMiniPlayer */}

          {/* RenderFullScreenMode */}
          <button
            className="Full_Screen_Btn"
            onClick={handleToggleFullScreenMode}
          >
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
          {/* RenderFullScreenMode */}
        </div>
      </div>
      <video
        ref={videoPlayerRef}
        src={videoSrc}
        onPlay={() => setIsVideoPaused(false)}
        onPause={() => setIsVideoPaused(true)}
        onClick={handlePlayPauseToggleButton}
        onVolumeChange={handleVolumeChanged}
        onDurationChange={handleDataLoaded}
        onTimeUpdate={handleTimeUpdate}
      ></video>
    </div>
  )
}

export default VideoPlayer
