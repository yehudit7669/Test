import {
  AudioIcon,
  CloseIconForRecorder,
  HandInWorkIcon,
  PlayIconForRecordedAnswers,
} from "../../../../../assets/svgs/svg-components";
import "./OpenQuestionWidget.css";
import {
  Grid,
  Typography,
  Divider,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import AudioRecorderDialog from "./audioRecorderDialog.tsx/AudioRecorderDialog";
import { useToggle } from "../../../../../hooks/useToggle";
import RichTextEditor from "./richTextEditor/RichTextEditor";
import { useTranslation } from "react-i18next";
import VideoRecorderDialog from "./videoRecorderDialog/VideoRecorderDialog";

export default function OpenQuestionWidget() {
  /* i18n dependencies */
  const {t} = useTranslation()
  /* i18n dependencies */

  /* Audio recorder Dialog dependencies */
  const {
    status: audioRecorderDialogStatus,
    changeStatus: handleChangeAudioRecorderDialogStatus,
  } = useToggle();
  /* Audio recorder Dialog dependencies */

  /* Video recorder Dialog dependencies */
  const {
    status: videoRecorderDialogStatus,
    changeStatus: handleChangeVideoRecorderDialogStatus,
  } = useToggle();
  /* Video recorder Dialog dependencies */

  /***** Widget --> Block-1 : Render Question Header *****/
  const renderQuestionAndDescriptionHeader = () => {
    return (
      <>
        <Grid item xs={12} display="flex" gap="0.5rem" flexDirection="column">
          <Typography className="Question">
            {/* Question will be rendered dynamically */}
            Question text-Open question - 4 lines.
            {/* Question will be rendered dynamically */}
          </Typography>
          <Divider variant="middle" className="Divider" />
          <Typography className="Instruction">
            {/* Description will be rendered dynamically */}
            More instructions + audio and video recording
            {/* Description will be rendered dynamically */}
          </Typography>
        </Grid>
      </>
    );
  };
  /***** Widget --> Block-1 : Render Question Header *****/

  /***** Widget --> Block-2 : Render Rich Text Editor *****/
  const renderRichTextEditor = () => {
    return (
      <>
        <Grid item xs={12}>
          <RichTextEditor />
        </Grid>
      </>
    );
  };
  /***** Widget --> Block-2 : Render Rich Text Editor *****/
  
  
  /***** Widget --> Block-3 : Render Audio Video Answer Recorder *****/
  const renderAudioVideoAnswerRecorders = () => {
    return (
      <>
      <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <Typography className="Answer_Recorder">
              {t("Widget.answerRecorder")}
            </Typography>
            <Stack direction="row">
              <Stack direction="row" className="AudioButton_Container">
                <IconButton onClick={handleChangeAudioRecorderDialogStatus}>
                  <div className="AudioIcon_Container">
                    <AudioIcon />
                  </div>
                </IconButton>
                <Typography className="Voice">Voice</Typography>
              </Stack>

              <Stack direction="row" className="VideoButton_Container">
                <IconButton onClick={handleChangeVideoRecorderDialogStatus}>
                  <div className="AudioIcon_Container">
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
  /***** Widget --> Block-3 : Render Audio Video Answer Recorder *****/
  
  /***** Widget --> Block-4 : Render Recorded Answers *****/
  const renderRecordedAnswers = () => {
    return (
      <>
      <Grid item xs={12}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography className="Answer_Recorder">
              {t("Widget.recordedAnswers")}
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
              <IconButton onClick={() => {}}>
                <div className="AudioIcon_Container PaddingForPlayIcon_Container">
                  <PlayIconForRecordedAnswers />
                </div>
              </IconButton>
              <Typography className="Voice">{t("Widget.voiceAnswer")}</Typography>
                <IconButton onClick={() => {}}>
                  <CloseIconForRecorder />
                </IconButton>
            </Stack>
          </Stack>
        </Grid>
      </>
    )
  }
  /***** Widget --> Block-4 : Render Recorded Answers *****/
  
  /***** Widget --> Block-5 : Render Saved And Hand In Work button *****/
  const renderSavedAndHandInWorkButtons = () => {
    return (
      <>
      <Grid item xs={12} marginTop={10}>
          <Stack direction="column" spacing={2}>
            <Divider variant="middle" className="Divider" data-saved />
            <Stack direction="row" justifyContent="end" spacing={2}>
              <Button className="Button" variant="contained" data-savedButton>
                {t("Widget.saved")}
              </Button>
              <Button className="Button" variant="contained" data-handInWork>
                <HandInWorkIcon />
                {t("Widget.handInWork")}
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </>
    )
  }
  /***** Widget --> Block-5 : Render Saved And Hand In Work button *****/

  return (
    <div className="OpenQuestionWidget_Container">
      <Grid container spacing={2}>
        {renderQuestionAndDescriptionHeader()}
        {renderRichTextEditor()}
        {renderAudioVideoAnswerRecorders()}
        {renderRecordedAnswers()}        

        

        {renderSavedAndHandInWorkButtons()}
      </Grid>

      {/* Audio dialog dependencies */}
      {
        <AudioRecorderDialog
          open={audioRecorderDialogStatus}
          handleClose={handleChangeAudioRecorderDialogStatus}
        />
      }
      {/* Audio dialog dependencies */}

      {/* Video dialog dependencies */}
      {
        <VideoRecorderDialog
          open={videoRecorderDialogStatus}
          handleClose={handleChangeVideoRecorderDialogStatus}
        />
      }
      {/* Audio dialog dependencies */}
    </div>
  );
}
