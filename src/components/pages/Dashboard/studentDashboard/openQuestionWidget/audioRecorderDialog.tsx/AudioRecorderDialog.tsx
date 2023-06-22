import Dialog from "@mui/material/Dialog";
import {
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { DialogContent } from "@mui/material";
import {
  CloseIconForRecorder,
  PauseRecordingIcon,
  PlayAudioIcon,
  RecordAudioIcon,
} from "../../../../../../assets/svgs/svg-components";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import Zoom from "@mui/material/Zoom";
import "./AudioRecorderDialog.css";
import { useState, useRef, useEffect } from "react";
import {
  formatTime,
  useTimer,
} from "../../../../../../hooks/useRecordAudioTimer";
import Uploader from "../../../../../common/uploader";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  handleClose: () => void;
};

/* Apply transition of zoom effect when the dialog opens and closes - Dialog dependencies */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom timeout={500} in ref={ref} {...props} />;
});
/* Apply transition of zoom effect when the dialog opens and closes - Dialog dependencies */

/* Mime type dependencies */
const mimeType = "audio/webm";
/* Mime type dependencies */

const AudioRecorderDialog = ({ open, handleClose }: Props) => {
  /* i18n dependencies */
  const { t } = useTranslation();
  /* i18n dependencies */

  /* Record audio timer dependencies */
  const [isRecording, setIsRecording] = useState(false);
  /* Record audio timer dependencies */

  /* Timer hook dependencies for recording the audio */
  const {
    duration: recordAudioDuration,
    handleStart: handleStartAudioRecording,
    handlePause: handlePauseAudioRecording,
    handleReset: handleResetAudioRecording,
  } = useTimer(0);
  /* Timer hook dependencies for recording the audio */

  /* Timer hook dependencies for playing the recorder audio */
  const {
    duration: playAudioDuration,
    handleStart: handlePlayAudio,
    handlePause: handlePauseAudio,
    handleReset: handleResetAudio,
  } = useTimer(0);
  /* Timer hook dependencies for playing the recorder audio */

  /* Record audio dependencies */
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<any>(null);
  const mediaRecorder = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState<any[]>([]);
  const [audio, setAudio] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isPlayingRecordedAudio, setIsPlayingRecordedAudio] = useState(false);
  /* Record audio dependencies */

  

  
  /* Condition to check if the playing duration is equal to the recorded duration */
  useEffect(() => {
    if (playAudioDuration > recordAudioDuration) {
      setIsPlayingRecordedAudio(false);
      handlePauseAudio();
      handleResetAudio();
    }
  }, [playAudioDuration, recordAudioDuration]);
  /* Condition to check if the playing duration is equal to the recorded duration */


  /* Function definition to reset the default values when dialog is closed - Dialog close dependencies */
  const onDialogClose = () => {
    handleClose();
    setRecordingStatus("inactive");
    setIsRecording(false);
    setPermission(false);
    handleResetAudioRecording();
    setLoading(false);
  };
  /* Function definition to reset the default values when dialog is closed - Dialog close dependencies */
  

  /***** Dialog title dependencies *****/
  const renderDialogTitle = () => {
    return (
      <>
        <DialogTitle
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <div>
            <Typography className="RecordAudioText">
              {t("AudioRecorder.header")}
            </Typography>
          </div>
          <div className="">
            <IconButton onClick={onDialogClose}>
              <CloseIconForRecorder />
            </IconButton>
          </div>
        </DialogTitle>
      </>
    );
  };
  /***** Dialog title dependencies *****/



  /***** Dialog Content Phase 1 - Get permissions and click on the button to start recording *****/
  const renderGetPermissionsAndStartRecordingOnClick = () => {
    /* Function definition to get the permissions and start recording */
    const handleGetPermissions = async () => {
      if ("MediaRecorder" in window) {
        try {
          const streamData = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          });
          setPermission(true);
          setStream(streamData);
          handleStartRecording(streamData);
        } catch (err: any) {
          alert(err?.message);
        }
      } else {
        alert("Audio recorder is not supported in your browser.");
      }
    };
    /* Function definition to get the permissions and start recording */

    /* Function definition Start recording audio after getting the permissions */
    const handleStartRecording = (stream: any) => {
      setRecordingStatus("recording");
      handleStartAudioRecording();
      setIsRecording(true);
      //create new Media recorder instance using the stream
      const media = new MediaRecorder(stream, { mimeType: mimeType });
      //set the MediaRecorder instance to the mediaRecorder ref
      mediaRecorder.current = media;
      //invokes the start method to start the recording process
      mediaRecorder.current?.start();
      let localAudioChunks: any[] = [];
      mediaRecorder.current.ondataavailable = (event: any) => {
        console.log(event, "event");
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);
      /* Function definition Start recording audio after getting the permissions */
    };

    return (
      <>
        {!permission && !isRecording && (
          <Stack
            spacing={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton onClick={handleGetPermissions}>
              <div className="RecordIcon_Container">
                <RecordAudioIcon />
              </div>
            </IconButton>
            <div className="UploadAudioFileDesctiption">
              {t("AudioRecorder.UploadAudioFileDesctiption")}{" "}
              <span className="UploadAudioFileText">
                {t("AudioRecorder.uploadAnAudio")}
              </span>
            </div>
          </Stack>
        )}
      </>
    );
  };
  /***** Dialog Content Phase 1 - Get permissions and click on the button to start recording *****/



  /***** Dialog Content Phase 2 - Click on the button to stop recording *****/
  const renderStopRecordingOnClick = () => {
    /* Function definition to stop recording */
    const handleStopRecording = () => {
      setRecordingStatus("inactive");
      handlePauseAudioRecording();
      setIsRecording(false);
      //stops the recording instance
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        //creates a blob file from the audiochunks data
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        //creates a playable URL from the blob file.
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);
        setAudioChunks([]);
      };
    };
    /* Function definition to stop recording */
    return (
      <>
        {permission && recordingStatus === "recording" && (
          <Stack
            spacing={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton onClick={handleStopRecording}>
              <div className="RecordIcon_Container">
                <PauseRecordingIcon />
              </div>
            </IconButton>
            <div className="stopwatch-card">
              <p>{formatTime(recordAudioDuration)}</p>
            </div>
          </Stack>
        )}
      </>
    );
  };
  /***** Dialog Content Phase 2 - Click on the button to stop recording *****/
  


  /***** Dialog Content Phase 3 - Click on the button to listen, pause, record again and upload recording *****/
  const renderPlayPauseUploadAndStartOverRecording = () => {
    
    /* Function definition to play audio file which is recorded */
    const handlePlayAudioRecorded = () => {
      audioRef.current.play();
      setIsPlayingRecordedAudio(true);
      handlePlayAudio();
    };
    /* Function definition to play audio file which is recorded */
    
    /* Function definition to pause audio file which is recorded */
    const handlePauseAudioRecorded = () => {
      audioRef.current.pause();
      setIsPlayingRecordedAudio(false);
      handlePauseAudio();
      handleResetAudio();
    };
    /* Function definition to pause audio file which is recorded */
    
    /* Function definition to record the audio again */
    const onStartOver = () => {
      setRecordingStatus("inactive");
      setIsRecording(false);
      setPermission(false);
      handleResetAudioRecording();
      setLoading(false);
    };
    /* Function definition to record the audio again */
    
    
    /* Function definition for API call - On Submit handler */
    const onSubmit = () => {
      setLoading(true);
      console.log(audio, "audio");
    };
    /* Function definition for API call - On Submit handler */
    return (
      <>
        {permission && recordingStatus === "inactive" && (
          <Stack
            spacing={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            >
            {isPlayingRecordedAudio === false ? (
              <IconButton onClick={handlePlayAudioRecorded}>
                <div className="RecordIcon_Container PaddingForPlayIcon_Container">
                  <PlayAudioIcon />
                </div>
              </IconButton>
            ) : (
              <IconButton onClick={handlePauseAudioRecorded}>
                <div className="RecordIcon_Container">
                  <PauseRecordingIcon />
                </div>
              </IconButton>
            )}
            <Button
              className="UploadButton"
              variant="outlined"
              size="small"
              onClick={onStartOver}
              >
              {t("AudioRecorder.startOver")}
            </Button>
            <div className="stopwatch-card">
              <span>{formatTime(playAudioDuration)}</span>
              <span> / {formatTime(recordAudioDuration)}</span>
              <audio src={audio} ref={audioRef} />
            </div>
            <Button
              className="UploadButton"
              variant="outlined"
              size="small"
              onClick={onSubmit}
              >
              {t("AudioRecorder.upload")}
            </Button>
          </Stack>
        )}
      </>
    );
  };
  /***** Dialog Content Phase 3 - Click on the button to listen, pause, record again and upload recording *****/
  
  return (
    <>
      <Dialog
        className="AudioRecorderDialog"
        open={open}
        onClose={onDialogClose}
        fullWidth
        TransitionComponent={Transition}
        maxWidth={"xs"}
      >
        {renderDialogTitle()}

        <DialogContent>
          {!loading && (
            <>
              {renderGetPermissionsAndStartRecordingOnClick()}
              {renderStopRecordingOnClick()}
              {renderPlayPauseUploadAndStartOverRecording()}
            </>
          )}

          {loading && (
            <Stack>
              <Uploader />
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AudioRecorderDialog;
