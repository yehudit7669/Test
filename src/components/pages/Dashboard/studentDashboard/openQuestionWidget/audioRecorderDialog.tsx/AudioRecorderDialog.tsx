import Dialog from "@mui/material/Dialog";
import { DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { DialogContent } from "@mui/material";
import { CloseIconForRecorder, RecordAudioIcon } from "../../../../../../assets/svgs/svg-components";
import React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Zoom from '@mui/material/Zoom';
import "./AudioRecorderDialog.css";
import {useState} from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Zoom timeout={500} in ref={ref} {...props} />;
  });

const AudioRecorderDialog = ({ open, handleClose }: Props) => {

  /* Record audio dependencies */
  const [isStartRecording, setIsStartRecording] = useState(false)
  /* Record audio dependencies */

  const handleRecordAudioAndGetPermissions = () => {
    setIsStartRecording(true)
  }

  return (
    <>
      <Dialog
        className="AudioRecorderDialog"
        open={open}
        onClose={handleClose}
        fullWidth
        TransitionComponent={Transition}
        maxWidth={"xs"}
      >
          <DialogTitle display="flex" alignItems="center" justifyContent="space-between">
            <div>
              <Typography className="RecordAudioText">Record audio</Typography>
            </div>
            <div className="">
              <IconButton onClick={handleClose}>
                <CloseIconForRecorder />
              </IconButton>
            </div>
          </DialogTitle>
        <DialogContent>
          {
            !isStartRecording &&
            <Stack spacing={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  <IconButton onClick={handleRecordAudioAndGetPermissions}>
                    <div className="RecordIcon_Container">
                      <RecordAudioIcon/>
                    </div>
                  </IconButton>
                  <div className="UploadAudioFileDesctiption">Simply click on the recording button and fire away! or <span className="UploadAudioFileText">upload an audio file</span></div>
            </Stack>
          }

          {
            isStartRecording &&
            <Stack spacing={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              
            </Stack>
          }
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AudioRecorderDialog;
