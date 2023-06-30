import { useRef, useEffect, useState } from 'react'
import { useToggle } from '../../../../../../../hooks/useToggle'
import { Slider } from '@mui/material'
import './VideoPlayer.css'

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

  /***** Video Player --> Phase 1 - Time line *****/
  const RenderTimeline = () => {
    /* Function definition for time line change event */
    const handleSliderTimelineChange = (
      event: Event,
      newValue: number | number[]
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
      newValue: number | number[]
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
              <svg className="Volume_High_Icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                />
              </svg>
            ) : videoPlayerVolumeType === 'low' ? (
              <svg className="Volume_Low_Icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                />
              </svg>
            ) : videoPlayerVolumeType === 'muted' ? (
              <svg className="Volume_Muted_Icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                />
              </svg>
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
