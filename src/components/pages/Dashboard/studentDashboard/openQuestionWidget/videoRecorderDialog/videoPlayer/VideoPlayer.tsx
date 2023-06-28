import { useVideoRecorderContext } from '../context/videoRecorderContext'
import './VideoPlayer.css'
import RenderTimeline from './timeline'
import RenderPlayPauseVideo from './playPauseVideo'
import RenderVolumeControls from './volumeControls'
import RenderVideoDuration from './renderVideoDuration'
import RenderVideoPlaybackSpeedAndMiniPlayer from './videoPlaybackSpeedAndMiniPlayer'
import RenderTheaterModeAndFullScreenMode from './theaterModeAndFullScreenMode'
import { useVideoPlayerContext } from '../context/videoPlayerContext'
import video from '../../../../../../../assets/videos/SampleVideo_720x480_20mb.mp4'
import { useRef } from 'react'

type Props = {
  videoSrc: string | null | undefined
}
export default function VideoPlayer({ videoSrc }: Props) {
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
  } = useVideoPlayerContext()
  let { videoPlayerRef } = useVideoPlayerContext()
  /* Context dependencies */

  const videoSrcRef = useRef<any>(null)

  /* Function definition to play and pause the video player */
  const handlePlayPauseToggleButton = () => {
    videoSrcRef.current.paused
      ? videoSrcRef.current.play()
      : videoSrcRef.current.pause()
  }
  /* Function definition to play and pause the video player */

  /* Function definition to change the volume */
  const handleVolumeChanged = () => {
    setVideoPlayerVolumeSliderValue(videoSrcRef.current.volume)
    let volumeLevel
    if (videoSrcRef.current.volume === '0' || videoSrcRef.current.muted) {
      setVideoPlayerVolumeSliderValue(0)
      volumeLevel = 'muted'
    } else if (videoSrcRef.current.volume >= '0.5') {
      volumeLevel = 'high'
    } else {
      volumeLevel = 'low'
    }
    setVideoPlayerVolumeType(volumeLevel)
  }
  /* Function definition to change the volume */

  /* On data load - set the duration of the video */
  const handleDataLoaded = () => {
    setVideoPlayerVolumeSliderValue(videoSrcRef?.current?.volume)
    if (videoSrcRef?.current?.duration === Infinity) {
      setVideoPlayerTotalTime(formatDuration(recordVideoDuration))
      setVideoPlayerMaxTimeForSliderValue(recordVideoDuration)
    } else {
      setVideoPlayerTotalTime(formatDuration(videoSrcRef.current.duration))
      setVideoPlayerMaxTimeForSliderValue(videoSrcRef.current.duration)
    }
  }
  /* On data load - set the duration of the video */

  /* Function definition to change the position of the slider on time change or time update */
  const handleTimeUpdate = () => {
    setVideoPlayerCurrentTime(formatDuration(videoSrcRef.current.currentTime))
    setTimelineSliderValue(videoSrcRef.current.currentTime)
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
            key={video}
            src={videoSrc || ''}
            ref={videoSrcRef}
            onPlay={() => setIsVideoPlayerPaused(false)}
            onPause={() => setIsVideoPlayerPaused(true)}
            onClick={handlePlayPauseToggleButton}
            onVolumeChange={handleVolumeChanged}
            onLoadedData={handleDataLoaded}
            onTimeUpdate={handleTimeUpdate}
            className="Video_Player"
          />
          <div className="Video_Controls_Container">
            <RenderTimeline videoSrcRef={videoSrcRef} />
            <div className="Controls_Container">
              <RenderPlayPauseVideo videoSrcRef={videoSrcRef} />
              <RenderVolumeControls videoSrcRef={videoSrcRef} />
              <RenderVideoDuration />
              <RenderVideoPlaybackSpeedAndMiniPlayer
                videoSrcRef={videoSrcRef}
              />
              <RenderTheaterModeAndFullScreenMode />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
