import { useRef, useEffect, useState } from 'react'
import { useToggle } from '../../../../../../../hooks/useToggle'
import { Slider } from '@mui/material'
import './VideoPlayer.css'
import {
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeMutedIcon,
} from '../../../../../../../assets/svgs/svg-components'

type Props = {
  videoSrc: string | undefined
  isStandAloneVideoPlayer: boolean
  recordVideoDuration: number
}
export default function VideoPlayer({
  videoSrc,
  isStandAloneVideoPlayer,
  recordVideoDuration,
}: Props) {
  const { status: isVideoPlayerPaused, setStatus: setIsVideoPlayerPaused } =
    useToggle(true)
  const {
    status: isVideoPlayerTheaterMode,
    changeStatus: setIsVideoPlayerTheaterMode,
  } = useToggle(false)
  const {
    status: isVideoPlayerFullScreenMode,
    changeStatus: setIsVideoPlayerFullScreenMode,
  } = useToggle(false)
  const {
    status: isVideoPlayerMiniMode,
    changeStatus: setIsVideoPlayerMiniMode,
  } = useToggle(false)
  const videoPlayerRef = useRef<any>(null)
  const videoPlayerContainerRef = useRef<any>(null)
  const [videoPlayerVolumeType, setVideoPlayerVolumeType] = useState('high')
  const [videoPlayerVolumeSliderValue, setVideoPlayerVolumeSliderValue] =
    useState<number | number[] | undefined>(0)
  const [videoPlayerTotalTime, setVideoPlayerTotalTime] = useState<
    number | string
  >('')
  const [
    videoPlayerMaxTimeForSliderValue,
    setVideoPlayerMaxTimeForSliderValue,
  ] = useState(0)
  const [videoPlayerCurrentTime, setVideoPlayerCurrentTime] = useState<
    number | string
  >('00:00')
  const [videoPlayerPlaybackSpeed, setVideoPlayerPlaybackSpeed] = useState('1x')
  const [timelineSliderValue, setTimelineSliderValue] = useState<
    number | number[] | undefined
  >(0)

  /* Function definition to play and pause the video player */
  const handlePlayPauseToggleButton = () => {
    videoPlayerRef.current.paused
      ? videoPlayerRef.current.play()
      : videoPlayerRef.current.pause()
  }
  /* Function definition to play and pause the video player */

  useEffect(() => {
    if (videoSrc) {
      const video = videoPlayerRef.current
      if (video) {
        video.load()
      }
    }
  }, [videoSrc, isStandAloneVideoPlayer])

  /* Function definition to change the volume */
  const handleVolumeChanged = () => {
    setVideoPlayerVolumeSliderValue(videoPlayerRef.current.volume)
    let volumeLevel
    if (videoPlayerRef.current.volume === '0' || videoPlayerRef.current.muted) {
      setVideoPlayerVolumeSliderValue(0)
      volumeLevel = 'muted'
    } else if (videoPlayerRef.current.volume >= '0.5') {
      volumeLevel = 'high'
    } else {
      volumeLevel = 'low'
    }
    setVideoPlayerVolumeType(volumeLevel)
  }
  /* Function definition to change the volume */

  /* On data load - set the duration of the video */
  const handleDataLoaded = (event: any) => {
    setVideoPlayerVolumeSliderValue(event.target?.volume)
    if (event.target?.duration !== Infinity && !isNaN(event.target.duration)) {
      setVideoPlayerTotalTime(formatDuration(event.target.duration))
      setVideoPlayerMaxTimeForSliderValue(event.target.duration)
      setVideoPlayerCurrentTime(formatDuration(event.target.currentTime))
      setTimelineSliderValue(event.target.currentTime)
    } else {
      setVideoPlayerTotalTime('00:00')
      //   setVideoPlayerTotalTime(formatDuration(recordVideoDuration))
      //   setVideoPlayerMaxTimeForSliderValue(recordVideoDuration)
    }
    if (!isStandAloneVideoPlayer) {
      setVideoPlayerTotalTime(formatDuration(recordVideoDuration))
      setVideoPlayerMaxTimeForSliderValue(recordVideoDuration)
    }
  }
  /* On data load - set the duration of the video */

  /* Function definition to change the position of the slider on time change or time update */
  const handleTimeUpdate = (event: any) => {
    if (event.target?.duration !== Infinity && !isNaN(event.target.duration)) {
      setVideoPlayerTotalTime(formatDuration(event.target.duration))
      setVideoPlayerMaxTimeForSliderValue(event.target.duration)
      setVideoPlayerCurrentTime(formatDuration(event.target.currentTime))
      setTimelineSliderValue(event.target.currentTime)
    } else {
      setVideoPlayerTotalTime('00:00')
      // setVideoPlayerTotalTime(formatDuration(recordVideoDuration))
      // setVideoPlayerMaxTimeForSliderValue(recordVideoDuration)
    }
    if (!isStandAloneVideoPlayer) {
      setVideoPlayerTotalTime(formatDuration(recordVideoDuration))
      setVideoPlayerMaxTimeForSliderValue(recordVideoDuration)
    }
  }
  /* Function definition to change the position of the slider on time change or time update */

  const handleVideoEnded = () => {
    setVideoPlayerCurrentTime('00:00')
    setTimelineSliderValue(0)
    setVideoPlayerTotalTime('00:00')
    setVideoPlayerMaxTimeForSliderValue(0)
    videoPlayerRef.current.currentTime = 0
    videoPlayerRef.current.max = 0
  }

  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  })

  const formatDuration = (time: number) => {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)

    if (hours === 0) {
      return `${leadingZeroFormatter.format(
        minutes,
      )}:${leadingZeroFormatter.format(seconds)}`
    } else {
      return `${leadingZeroFormatter.format(
        hours,
      )}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(
        seconds,
      )}`
    }
  }

  /***** Video Player --> Phase 1 - Time line *****/
  const RenderTimeline = () => {
    /* Function definition for time line change event */
    const handleSliderTimelineChange = (
      event: Event,
      newValue: number | number[],
    ) => {
      setTimelineSliderValue(newValue)
      videoPlayerRef.current.currentTime = (
        event.target as HTMLInputElement
      ).value
    }
    /* Function definition for time line change event */

    return (
      <>
        <Slider
          className="Timeline_Container"
          min={0}
          max={videoPlayerMaxTimeForSliderValue}
          value={timelineSliderValue}
          onChange={handleSliderTimelineChange}
        />
      </>
    )
  }
  /***** Video Player --> Phase 1 - Time line *****/

  /***** Video Player --> Phase 2 - Play pause video *****/
  const RenderPlayPauseVideo = () => {
    /* Function definition to play and pause video player */
    const handlePlayPauseToggleButton = () => {
      videoPlayerRef.current.paused
        ? videoPlayerRef.current.play()
        : videoPlayerRef.current.pause()
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
  /***** Video Player --> Phase 2 - Play pause video *****/

  /***** Video Player --> Phase 3 - Volume controls *****/
  const RenderVolumeControls = () => {
    /* Function definition to change the volume using slider */
    const handleVolumeSliderChange = (
      event: Event,
      newValue: number | number[],
    ) => {
      videoPlayerRef.current.volume = newValue
      videoPlayerRef.current.muted = newValue.toString() === '0'
      if (event) setVideoPlayerVolumeSliderValue(videoPlayerRef.current.volume)
    }
    /* Function definition to change the volume using slider */

    /* Function definition to toggle volume button */
    const handleToggleVolumeButton = () => {
      videoPlayerRef.current.muted = !videoPlayerRef.current.muted
    }
    /* Function definition to toggle volume button */

    return (
      <>
        <div className="Volume_Container">
          <button className="Mute_Btn" onClick={handleToggleVolumeButton}>
            {videoPlayerVolumeType === 'high' ? (
              <VolumeHighIcon />
            ) : videoPlayerVolumeType === 'low' ? (
              <VolumeLowIcon />
            ) : videoPlayerVolumeType === 'muted' ? (
              <VolumeMutedIcon />
            ) : null}
          </button>
          <Slider
            min={0}
            step={0.1}
            max={1}
            className="Volume_Slider"
            value={
              typeof videoPlayerVolumeSliderValue === 'number'
                ? videoPlayerVolumeSliderValue
                : 0
            }
            onChange={handleVolumeSliderChange}
          />
        </div>
      </>
    )
  }
  /***** Video Player --> Phase 3 - Volume controls *****/

  /***** Video Player --> Phase 4 - Video duration *****/
  const RenderVideoDuration = () => {
    return (
      <>
        <div className="Duration_Container">
          <div className="Current_Time">{videoPlayerCurrentTime}</div>/
          <div className="Total_Time">{videoPlayerTotalTime}</div>
        </div>
      </>
    )
  }
  /***** Video Player --> Phase 4 - Video duration *****/

  /***** Video Player --> Phase 5 - Video playback speed *****/
  const RenderVideoPlaybackSpeedAndMiniPlayer = () => {
    /* Function definition to change the playback speed */
    const handleChangePlaybackSpeed = () => {
      let newPlaybackSpeed = videoPlayerRef.current.playbackRate + 0.25
      if (newPlaybackSpeed > 2) newPlaybackSpeed = 0.25
      videoPlayerRef.current.playbackRate = newPlaybackSpeed
      setVideoPlayerPlaybackSpeed(`${newPlaybackSpeed}x`)
    }
    /* Function definition to change the playback speed */

    /* Function definition to toggle the mini player button */
    const handleToggleMiniPlayer = () => {
      if (isVideoPlayerMiniMode) {
        document.exitPictureInPicture()
      } else {
        videoPlayerRef.current.requestPictureInPicture()
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
  /***** Video Player --> Phase 5 - Video playback speed *****/

  /***** Video Player --> Phase 6 - Video playback speed *****/
  const RenderTheaterModeAndFullScreenMode = () => {
    /* Function definition to toggle theater mode */
    const handleToggleTheaterMode = () => {
      setIsVideoPlayerTheaterMode()
    }
    /* Function definition to toggle theater mode */

    /* Function definition to toggle full screen mode */
    const handleToggleFullScreenMode = () => {
      if (document.fullscreenElement === null) {
        videoPlayerContainerRef.current
          .requestFullscreen()
          .then(() => undefined)
          .catch((err: any) => {
            alert(
              `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
            )
          })
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
      </>
    )
  }
  /***** Video Player --> Phase 6 - Video playback speed *****/

  return (
    <>
      <div
        ref={videoPlayerContainerRef}
        className={`Video_Player_Container ${
          isVideoPlayerMiniMode ? 'mini-player' : ''
        } ${isVideoPlayerFullScreenMode ? 'full-screen' : ''} ${
          isVideoPlayerTheaterMode ? 'theater' : ''
        } ${isVideoPlayerPaused ? 'paused' : ''}`}
      >
        <video
          key={videoSrc}
          ref={videoPlayerRef}
          onPlay={() => setIsVideoPlayerPaused(false)}
          onPause={() => setIsVideoPlayerPaused(true)}
          onClick={handlePlayPauseToggleButton}
          onVolumeChange={handleVolumeChanged}
          onLoadedMetadata={handleDataLoaded}
          onDurationChange={handleDataLoaded}
          onEnded={handleVideoEnded}
          onTimeUpdate={handleTimeUpdate}
          preload="auto"
          className="Video_Player"
        >
          <source src={videoSrc} />
        </video>
        <div className="Video_Controls_Container">
          <RenderTimeline />
          <div className="Controls_Container">
            <RenderPlayPauseVideo />
            <RenderVolumeControls />
            <RenderVideoDuration />
            <RenderVideoPlaybackSpeedAndMiniPlayer />
            <RenderTheaterModeAndFullScreenMode />
          </div>
        </div>
      </div>
    </>
  )
}
