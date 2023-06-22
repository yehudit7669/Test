import {
  AudioIcon,
  CancelIcon,
  CloseIconForRecorder,
  HandInWorkIcon,
  PlayAudioIcon,
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
import { useState } from "react";
import AudioRecorderDialog from "./audioRecorderDialog.tsx/AudioRecorderDialog";

export default function OpenQuestionWidget() {
  /* Audio recorder Dialog dependencies */
  const [audioRecorderDialog, setAudioRecorderDialog] =
    useState<boolean>(false);
  /* Audio recorder Dialog dependencies */

  /* Dialog dependencies */
  const handleAudioRecorderDialogOpen = () => {
    setAudioRecorderDialog(true);
  };

  const handleAudioRecorderDialogClose = () => {
    setAudioRecorderDialog(false);
  };
  /* Dialog dependencies */

  return (
    <div className="OpenQuestionWidget_Container">
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" gap="0.5rem" flexDirection="column">
          <Typography className="Question">
            Question text-Open question - 4 lines.
          </Typography>
          <Divider variant="middle" className="Divider" />
          <Typography className="Instruction">
            More instructions + audio and video recording
          </Typography>
        </Grid>
        <Grid item xs={12}>
          Rich text box
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <Typography className="Answer_Recorder">
              Answer recorder (optional) :
            </Typography>
            <Stack direction="row">
              <Stack direction="row" className="AudioButton_Container">
                <IconButton onClick={() => handleAudioRecorderDialogOpen()}>
                  <div className="AudioIcon_Container">
                    <AudioIcon />
                  </div>
                </IconButton>
                <Typography className="Voice">Voice</Typography>
              </Stack>

              <Stack direction="row" className="VideoButton_Container">
                <IconButton onClick={() => handleAudioRecorderDialogOpen()}>
                  <div className="AudioIcon_Container">
                    <AudioIcon />
                  </div>
                </IconButton>
                <Typography className="Voice">Video</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography className="Answer_Recorder">
              Recorder Answers :
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
              <Typography className="Voice">Voice Answer</Typography>
              <div className="">
                <IconButton onClick={() => {}}>
                  <CloseIconForRecorder />
                </IconButton>
              </div>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} marginTop={10}>
          <Stack direction="column" spacing={2}>
            <Divider variant="middle" className="Divider" data-saved />
            <Stack direction="row" justifyContent="end" spacing={2}>
              <Button className="Button" variant="contained" data-savedButton>
                Saved
              </Button>
              <Button className="Button" variant="contained" data-handInWork>
                <HandInWorkIcon />
                Hand In work
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* Audio dialog dependencies */}
      {
        <AudioRecorderDialog
          open={audioRecorderDialog}
          handleClose={handleAudioRecorderDialogClose}
        />
      }
      {/* Audio dialog dependencies */}
    </div>
  );
}
