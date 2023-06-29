import {
  CircularProgress,
  Grid,
  IconButton,
  Slider,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import {
  PauseIconForRecordedAnswers,
  PlayIconForRecordedAnswers,
} from '../../../../../../assets/svgs/svg-components'
import { useTranslation } from 'react-i18next'
import { useRef, useCallback, forwardRef } from 'react'
import audio from '../../../../../../assets/audios/file_example_MP3_5MG.mp3'
import './AudioPlayer.css'

type Props = {
  audioSrc: string | undefined
  audioName: string
}

const AudioPlayer = ({ audioSrc, audioName }: Props) => {
  /* i18n dependencies */
  const { t } = useTranslation()

  /* Audio player dependencies */
  const [isPlayingRecordedAudio, setIsPlayingRecordedAudio] = useState(false)
  const [audioDuration, setAudioDuration] = useState<string>('00:00')
  const [playAudioCurrentTime, setPlayAudioCurrentTime] =
    useState<string>('00:00')
  const [
    audioPlayerMaxTimeForSliderValue,
    setAudioPlayerMaxTimeForSliderValue,
  ] = useState(0)
  const [timelineSliderValue, setTimelineSliderValue] = useState<
    number | number[] | undefined
  >(0)
  const [loading, setLoading] = useState(false)
  const [isShowAudioPlayer, setIsShowAudioPlayer] = useState(false)
  const audioRef = useRef<any>(null)
  /* Audio player dependencies */

  /* Check if the current time is greater than audio duration time */
  useEffect(() => {
    if (playAudioCurrentTime === audioDuration) {
    }
  }, [playAudioCurrentTime, audioDuration])
  /* Check if the current time is greater than audio duration time */

  /***** Seperate component for Play Pause Buttons *****/
  const PlayIconButton = () => {
    /* Function definition to play audio file which is recorded */
    const handlePlayAudioRecorded = () => {
      setLoading(true)
      setTimeout(() => {
        audioRef.current.play()
        setIsPlayingRecordedAudio(true)
        setIsShowAudioPlayer(true)
        setLoading(false)
      }, 500)
    }
    /* Function definition to play audio file which is recorded */

    return (
      <IconButton onClick={handlePlayAudioRecorded}>
        <div className="AudioVideoIcon_Container PaddingForPlayIcon_Container">
          <PlayIconForRecordedAnswers />
        </div>
      </IconButton>
    )
  }

  const PauseIconButton = () => {
    /* Function definition to pause audio file which is recorded */
    const handlePauseAudioRecorded = () => {
      audioRef.current.pause()
      setIsPlayingRecordedAudio(false)
    }
    /* Function definition to pause audio file which is recorded */

    return (
      <IconButton onClick={handlePauseAudioRecorded}>
        <div className="AudioVideoIcon_Container">
          <PauseIconForRecordedAnswers />
        </div>
      </IconButton>
    )
  }

  const PlayPauseRecordingIconButtons = () => {
    return isPlayingRecordedAudio === false ? (
      <PlayIconButton />
    ) : (
      <PauseIconButton />
    )
  }
  /***** Seperate component for Play Pause Buttons *****/

  useEffect(() => {
    const handleDataLoaded = () => {
      console.log(audioRef.current.currentTime, 'ref.current.currentTime')
      console.log(audioRef.current.duration, 'ref.current.duration')
      if (audioRef.current.duration !== Infinity) {
        setAudioDuration(formatDuration(audioRef.current.duration))
        setAudioPlayerMaxTimeForSliderValue(audioRef.current.duration)
        setPlayAudioCurrentTime(formatDuration(audioRef.current.currentTime))
        setTimelineSliderValue(audioRef.current.currentTime)
      }
    }

    audioRef.current.addEventListener('loadedmetadata', handleDataLoaded)
    audioRef.current.addEventListener('ondurationchange', handleDataLoaded)
    
    return () => {
      audioRef.current.removeEventListener('loadedmetadata', handleDataLoaded)
      audioRef.current.removeEventListener('ondurationchange', handleDataLoaded)
    }
  }, [])

  /* Function definition to change the position of the slider on time change or time update */
  const handleTimeUpdate = () => {
    if (audioRef.current.duration !== Infinity) {
      setPlayAudioCurrentTime(formatDuration(audioRef.current.currentTime))
      setTimelineSliderValue(audioRef.current.currentTime)
      setAudioDuration(formatDuration(audioRef.current.duration))
      setAudioPlayerMaxTimeForSliderValue(audioRef.current.duration)
    }
  }
  /* Function definition to change the position of the slider on time change or time update */

  const handleAudioEnd = () => {
    setIsPlayingRecordedAudio(false)
    setIsShowAudioPlayer(false)
    setPlayAudioCurrentTime('00:00')
    setTimelineSliderValue(0)
    setAudioDuration('00:00')
    setAudioPlayerMaxTimeForSliderValue(0)
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

  /* Function definition on slider timeline change */
  const handleSliderTimelineChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setTimelineSliderValue(newValue)
    audioRef.current.currentTime = (event.target as HTMLInputElement).value
  }
  /* Function definition on slider timeline change */

  return (
    <>
      <Stack
        border="1px solid #E6E6E6"
        bgcolor="#F2F2F2"
        borderRadius="5px"
        padding="2px"
        className="AudioPlayer_Container"
      >
        <audio
          ref={audioRef}
          // onLoadedMetadata={handleDataLoaded}
          // onLoadedData={handleDataLoaded}
          // onDurationChange={handleDataLoaded}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnd}
          // onLoadedMetadata = {handleDataLoaded}
        >
          {/* <source src={"https://dynamic.wizer.me/ws-audio/fd038199-7933-418e-af18-c9ccf3997b6e"}/> */}
          <source src={`https://dynamic.wizer.me/ws-audio/${audioName}`} />
        </audio>
        <Grid container spacing={2} display="flex" alignItems="center">
          <Grid item xs={2}>
            <PlayPauseRecordingIconButtons />
          </Grid>
          {!loading && (
            <>
              {!isShowAudioPlayer ? (
                <Grid item xs={9}>
                  <Typography className="listenToInstructions">
                    {t('Widget.listenToInstructions')}
                  </Typography>
                </Grid>
              ) : (
                <>
                  <Grid item xs={4} className="Timer_Container">
                    <span className="Timer">{playAudioCurrentTime}</span>
                    <span className="Timer"> / {audioDuration}</span>
                  </Grid>
                  <Grid item xs={5}>
                    <Slider
                      className="Timeline_Container"
                      min={0}
                      max={audioPlayerMaxTimeForSliderValue}
                      value={timelineSliderValue}
                      onChange={handleSliderTimelineChange}
                    />
                  </Grid>
                </>
              )}
            </>
          )}
          {loading && (
            <Grid
              item
              xs={9}
              display="flex"
              alignItems="center"
              gap={2}
              justifyContent="center"
            >
              <Typography className="listenToInstructions">
                {t('Widget.loading')}
              </Typography>
              <CircularProgress className="AudioPlayer_Loading" />
            </Grid>
          )}
        </Grid>
      </Stack>
    </>
  )
}

export default AudioPlayer
