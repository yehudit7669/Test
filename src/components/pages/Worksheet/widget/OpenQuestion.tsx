import { Grid, IconButton, Stack, Typography } from '@mui/material'
import AudioVideoInstructions from '../../Dashboard/studentDashboard/openQuestionWidget/audioVideoInstructions/AudioVideoInstructions'
import RichTextEditor from '../../Dashboard/studentDashboard/openQuestionWidget/richTextEditor/RichTextEditor'
import {
  AudioIcon,
  CloseIconForRecorder,
  PlayIconForRecordedAnswers,
} from '../../../../assets/svgs/svg-components'
import { useToggle } from '../../../../hooks/useToggle'
import { useTranslation } from 'react-i18next'
import AudioRecorderDialog from '../../Dashboard/studentDashboard/openQuestionWidget/audioRecorderDialog.tsx/AudioRecorderDialog'
import VideoRecorderDialog from '../../Dashboard/studentDashboard/openQuestionWidget/videoRecorderDialog/VideoRecorderDialog'
import RenderQuestionHeader from './common/renderQuestions/RenderQuestionHeader'
interface OpenQuestionProps {
  data: {
    title: string
    description: string
    audio?: {
      url: string
      name: string
    }
    video?: {
      url: string
    }
  }
}

const OpenQuestion: React.FC<OpenQuestionProps> = ({ data }) => {
  /* i18n dependencies */
  const { t } = useTranslation()
  /* Audio recorder Dialog dependencies */
  const {
    status: audioRecorderDialogStatus,
    changeStatus: handleChangeAudioRecorderDialogStatus,
  } = useToggle(false)
  /* Video recorder Dialog dependencies */
  const {
    status: videoRecorderDialogStatus,
    changeStatus: handleChangeVideoRecorderDialogStatus,
  } = useToggle(false)

  /***** Widget --> Block-1 : Render Question Header *****/

  const renderAudioVideoAnswerRecorders = () => {
    return (
      <>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <Typography className="Answer_Recorder">
              {t('Widget.answerRecorder')}
            </Typography>
            <Stack direction="row">
              <Stack direction="row" className="AudioButton_Container">
                <IconButton onClick={handleChangeAudioRecorderDialogStatus}>
                  <div className="AudioVideoIcon_Container">
                    <AudioIcon />
                  </div>
                </IconButton>
                <Typography className="Voice">Voice</Typography>
              </Stack>

              <Stack direction="row" className="VideoButton_Container">
                <IconButton onClick={handleChangeVideoRecorderDialogStatus}>
                  <div className="AudioVideoIcon_Container">
                    <AudioIcon />
                  </div>
                </IconButton>
                <Typography className="Voice">Video</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </>
    )
  }

  /***** Widget --> Block-4 : Render Recorded Answers *****/
  const renderRecordedAnswers = () => {
    return (
      <>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography className="Answer_Recorder">
              {t('Widget.recordedAnswers')}
            </Typography>
            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              justifyContent="space-around"
              border="1px solid #E6E6E6"
              bgcolor="#F2F2F2"
              borderRadius="5px"
              width="242.43px"
              padding="2px"
            >
              <IconButton>
                <div className="AudioVideoIcon_Container PaddingForPlayIcon_Container">
                  <PlayIconForRecordedAnswers />
                </div>
              </IconButton>
              <Typography className="Voice">
                {t('Widget.voiceAnswer')}
              </Typography>
              <IconButton>
                <CloseIconForRecorder />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
      </>
    )
  }

  return (
    <div className="Widget_Container">
      <Grid container spacing={2}>
        <RenderQuestionHeader title={data?.title} desc={data?.description} />
        {(data.audio || data.video) && (
          <Grid item xs={12}>
            <AudioVideoInstructions
              videoSrc={data?.video?.url}
              audioSrc={data?.audio?.url}
              audioName = {data?.audio?.name}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <RichTextEditor />
        </Grid>
        {renderAudioVideoAnswerRecorders()}
        {renderRecordedAnswers()}
        <AudioRecorderDialog
          open={audioRecorderDialogStatus}
          handleClose={handleChangeAudioRecorderDialogStatus}
        />
        <VideoRecorderDialog
          open={videoRecorderDialogStatus}
          handleClose={handleChangeVideoRecorderDialogStatus}
        />
      </Grid>
    </div>
  )
}

export default OpenQuestion
