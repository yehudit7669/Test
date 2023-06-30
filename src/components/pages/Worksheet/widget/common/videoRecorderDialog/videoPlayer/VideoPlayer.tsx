import { useVideoRecorderContext } from '../context/videoRecorderContext/VideoRecorderContext'
import RenderTimeline from './timeline'
import RenderPlayPauseVideo from './playPauseVideo'
import RenderVolumeControls from './volumeControls'
import RenderVideoDuration from './renderVideoDuration'
import RenderVideoPlaybackSpeedAndMiniPlayer from './videoPlaybackSpeedAndMiniPlayer'
import RenderTheaterModeAndFullScreenMode from './theaterModeAndFullScreenMode'
import { useVideoPlayerContext } from '../context/videoPlayerContext/VideoPlayerContext'
import { useRef, useEffect } from 'react'
import './VideoPlayer.css'

type Props = {
  videoSrc: string | undefined
  isStandAloneVideoPlayer: boolean
}
export default function VideoPlayer({
  videoSrc,
  isStandAloneVideoPlayer,
}: Props) {
  /* Context dependencies */
  const { recordVideoDuration, recordedVideo } = useVideoRecorderContext()
  const {
    setVideoPlayerVolumeSliderValue,
    setVideoPlayerVolumeType,
    setVideoPlayerTotalTime,
    setVideoPlayerCurrentTime,
    videoPlayerContainerRef,
    isVideoPlayerMiniMode,
    isVideoPlayerPaused,
    isVideoPlayerFullScreenMode,
    isVideoPlayerTheaterMode,
    setIsVideoPlayerPaused,
    setTimelineSliderValue,
    setVideoPlayerMaxTimeForSliderValue,
    videoPlayerRef,
  } = useVideoPlayerContext()
  /* Context dependencies */

  const videoSrcRef = useRef<any>(null)

  /* Function definition to play and pause the video player */
  const handlePlayPauseToggleButton = () => {
    let ref
    if (isStandAloneVideoPlayer) {
      ref = videoSrcRef
    } else {
      ref = videoPlayerRef
    }
    ref.current.paused ? ref.current.play() : ref.current.pause()
  }
  /* Function definition to play and pause the video player */

  useEffect(() => {
    if (videoSrc) {
      let ref
      if (isStandAloneVideoPlayer) {
        ref = videoSrcRef
      } else {
        ref = videoPlayerRef
      }
      const video = ref.current
      if (video) {
        video.load()
      }
    }
  }, [videoSrc, isStandAloneVideoPlayer, videoPlayerRef])

  /* Function definition to change the volume */
  const handleVolumeChanged = () => {
    let ref
    if (isStandAloneVideoPlayer) {
      ref = videoSrcRef
    } else {
      ref = videoPlayerRef
    }
    setVideoPlayerVolumeSliderValue(ref.current.volume)
    let volumeLevel
    if (ref.current.volume === '0' || ref.current.muted) {
      setVideoPlayerVolumeSliderValue(0)
      volumeLevel = 'muted'
    } else if (ref.current.volume >= '0.5') {
      volumeLevel = 'high'
    } else {
      volumeLevel = 'low'
    }
    setVideoPlayerVolumeType(volumeLevel)
  }
  /* Function definition to change the volume */

  /* On data load - set the duration of the video */
  const handleDataLoaded = () => {
    let tempRef
    if (isStandAloneVideoPlayer) {
      tempRef = videoSrcRef
    } else {
      tempRef = videoPlayerRef
    }
    setVideoPlayerVolumeSliderValue(tempRef?.current?.volume)
    if (
      tempRef?.current?.duration !== Infinity &&
      !isNaN(tempRef.current.duration)
    ) {
      setVideoPlayerTotalTime(formatDuration(tempRef.current.duration))
      setVideoPlayerMaxTimeForSliderValue(tempRef.current.duration)
      setVideoPlayerCurrentTime(formatDuration(tempRef.current.currentTime))
      setTimelineSliderValue(tempRef.current.currentTime)
    } else {
      setVideoPlayerTotalTime(formatDuration(recordVideoDuration))
      setVideoPlayerMaxTimeForSliderValue(recordVideoDuration)
    }
  }
  /* On data load - set the duration of the video */

  /* Function definition to change the position of the slider on time change or time update */
  const handleTimeUpdate = () => {
    let tempRef
    if (isStandAloneVideoPlayer) {
      tempRef = videoSrcRef
    } else {
      tempRef = videoPlayerRef
    }
    if (
      tempRef?.current?.duration !== Infinity &&
      !isNaN(tempRef.current.duration)
    ) {
      setVideoPlayerTotalTime(formatDuration(tempRef.current.duration))
      setVideoPlayerMaxTimeForSliderValue(tempRef.current.duration)
      setVideoPlayerCurrentTime(formatDuration(tempRef.current.currentTime))
      setTimelineSliderValue(tempRef.current.currentTime)
    } else {
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
    let tempRef
    if (isStandAloneVideoPlayer) {
      tempRef = videoSrcRef
    } else {
      tempRef = videoPlayerRef
    }
    tempRef.current.currentTime = 0
    tempRef.current.max = 0
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

  return (
    <>
      {recordedVideo || videoSrc ? (
        <div
          ref={videoPlayerContainerRef}
          className={`Video_Player_Container ${
            isVideoPlayerMiniMode ? 'mini-player' : ''
          } ${isVideoPlayerFullScreenMode ? 'full-screen' : ''} ${
            isVideoPlayerTheaterMode ? 'theater' : ''
          } ${isVideoPlayerPaused ? 'paused' : ''}`}
        >
          <video
            key={isStandAloneVideoPlayer ? videoSrc : recordedVideo}
            ref={isStandAloneVideoPlayer ? videoSrcRef : videoPlayerRef}
            onPlay={() => setIsVideoPlayerPaused(false)}
            onPause={() => setIsVideoPlayerPaused(true)}
            onClick={handlePlayPauseToggleButton}
            onVolumeChange={handleVolumeChanged}
            onLoadedMetadata={handleDataLoaded}
            onDurationChange={handleDataLoaded}
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            className="Video_Player"
          >
            <source src={isStandAloneVideoPlayer ? videoSrc : recordedVideo} />
          </video>
          <div className="Video_Controls_Container">
            <RenderTimeline
              isStandAloneVideoPlayer={isStandAloneVideoPlayer}
              ref={videoSrcRef}
            />
            <div className="Controls_Container">
              <RenderPlayPauseVideo
                isStandAloneVideoPlayer={isStandAloneVideoPlayer}
                ref={videoSrcRef}
              />
              <RenderVolumeControls
                isStandAloneVideoPlayer={isStandAloneVideoPlayer}
                ref={videoSrcRef}
              />
              <RenderVideoDuration />
              <RenderVideoPlaybackSpeedAndMiniPlayer
                isStandAloneVideoPlayer={isStandAloneVideoPlayer}
                ref={videoSrcRef}
              />
              <RenderTheaterModeAndFullScreenMode />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
