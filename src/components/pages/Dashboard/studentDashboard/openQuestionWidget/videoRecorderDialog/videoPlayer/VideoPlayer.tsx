import { useVideoRecorderContext } from '../context/videoRecorderContext'
import './VideoPlayer.css'
import RenderTimeline from './timeline'
import RenderPlayPauseVideo from './playPauseVideo'
import RenderVolumeControls from './volumeControls'
import RenderVideoDuration from './renderVideoDuration'
import RenderVideoPlaybackSpeedAndMiniPlayer from './videoPlaybackSpeedAndMiniPlayer'
import RenderTheaterModeAndFullScreenMode from './theaterModeAndFullScreenMode'
import { useVideoPlayerContext } from '../context/videoPlayerContext'
import {useRef} from "react";
import video from "../../../../../../../assets/videos/SampleVideo_720x480_20mb.mp4"

type Props = {
  videoSrc: string | undefined;
  isStandAloneVideoPlayer : boolean;
}
export default function VideoPlayer({ videoSrc, isStandAloneVideoPlayer }: Props) {
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
    videoPlayerRef
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
    ref.current.paused
      ? ref.current.play()
      : ref.current.pause()
  }
  /* Function definition to play and pause the video player */

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
    let ref
    if (isStandAloneVideoPlayer) {
      ref = videoSrcRef
    } else {
      ref = videoPlayerRef
    }
    setVideoPlayerVolumeSliderValue(ref?.current?.volume)
    console.log(ref.current.duration,'videoPlayerRef.current.duration')
    if (ref?.current?.duration === Infinity) {
      setVideoPlayerTotalTime(formatDuration(recordVideoDuration))
      setVideoPlayerMaxTimeForSliderValue(recordVideoDuration)
    } else {
      setVideoPlayerTotalTime(formatDuration(ref.current.duration))
      setVideoPlayerMaxTimeForSliderValue(ref.current.duration)
    }
  }
  /* On data load - set the duration of the video */

  /* Function definition to change the position of the slider on time change or time update */
  const handleTimeUpdate = () => {
    let ref
    if (isStandAloneVideoPlayer) {
      ref = videoSrcRef
    } else {
      ref = videoPlayerRef
    }
    setVideoPlayerCurrentTime(formatDuration(ref.current.currentTime))
    setTimelineSliderValue(ref.current.currentTime)
  }
  /* Function definition to change the position of the slider on time change or time update */

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
      {(recordedVideo || videoSrc) ? (
        <div
          ref={videoPlayerContainerRef}
          className={`Video_Player_Container ${
            isVideoPlayerMiniMode ? 'mini-player' : ''
          } ${isVideoPlayerFullScreenMode ? 'full-screen' : ''} ${
            isVideoPlayerTheaterMode ? 'theater' : ''
          } ${isVideoPlayerPaused ? 'paused' : ''}`}
        >
          <video
            ref={(isStandAloneVideoPlayer) ? videoSrcRef : videoPlayerRef}
            onPlay={() => setIsVideoPlayerPaused(false)}
            onPause={() => setIsVideoPlayerPaused(true)}
            onClick={handlePlayPauseToggleButton}
            onVolumeChange={handleVolumeChanged}
            onLoadedMetadata={handleDataLoaded}
            onDurationChange={handleDataLoaded}
            onTimeUpdate={handleTimeUpdate}
            className="Video_Player"
          >
            <source src={(isStandAloneVideoPlayer) ? videoSrc : recordedVideo}/>
          </video>
          <div className="Video_Controls_Container">
            <RenderTimeline isStandAloneVideoPlayer={isStandAloneVideoPlayer} ref={videoSrcRef}/>
            <div className="Controls_Container">
              <RenderPlayPauseVideo isStandAloneVideoPlayer={isStandAloneVideoPlayer} ref={videoSrcRef}/>
              <RenderVolumeControls isStandAloneVideoPlayer={isStandAloneVideoPlayer} ref={videoSrcRef}/>
              <RenderVideoDuration />
              <RenderVideoPlaybackSpeedAndMiniPlayer isStandAloneVideoPlayer={isStandAloneVideoPlayer} ref={videoSrcRef}/>
              <RenderTheaterModeAndFullScreenMode/>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
