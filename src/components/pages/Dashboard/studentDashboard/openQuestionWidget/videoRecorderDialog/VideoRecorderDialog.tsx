import Dialog from "@mui/material/Dialog";
import {
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { DialogContent } from "@mui/material";
import { CloseIconForRecorder, RecordAudioIcon } from "../../../../../../assets/svgs/svg-components";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import Zoom from "@mui/material/Zoom";
import "./VideoRecorderDialog.css";
import { useState, useRef, useEffect } from "react";
import {
  formatTime,
  useTimer,
} from "../../../../../../hooks/useRecordAudioTimer";
import Uploader from "../../../../../common/uploader";
import { useTranslation } from "react-i18next";

const mimeType = "video/webm";

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

const VideoRecorderDialog = ({ open, handleClose }: Props) => {
  /* i18n dependencies */
  const { t } = useTranslation();
  /* i18n dependencies */

  /* Record audio timer dependencies */
  const [isRecording, setIsRecording] = useState(false);
  /* Record audio timer dependencies */

  /* Record audio dependencies */
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<any>(null);
  const mediaRecorder = useRef<any>(null);
  const videoRef = useRef<any>(null);
  const liveVideoFeed = useRef<any>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [videoChunks, setVideoChunks] = useState<any[]>([]);
  const [recordedVideo, setRecordedVideo] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isPlayingRecordedVideo, setIsPlayingRecordedVideo] = useState(false);
  /* Record audio dependencies */


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
              {t("VideoRecorder.header")}
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


  /***** Dialog Content : Phase 1 --> Get permissions and start recording *****/
  const renderGetPermissionsAndStartRecordingOnClick = () => {
    
    useEffect(()=>{
      const handleGetPermissions = async() => {
            setRecordedVideo("");
            if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                audio: false,
                video: true,
                };
                const audioConstraints = { audio: true };
                // create audio and video streams separately
                const audioStream = await navigator.mediaDevices.getUserMedia(
                audioConstraints
                );
                const videoStream = await navigator.mediaDevices.getUserMedia(
                videoConstraints
                );
                setPermission(true);
                //combine both audio and video streams
                const combinedStream = new MediaStream([
                ...videoStream.getVideoTracks(),
                ...audioStream.getAudioTracks(),
                ]);
                setStream(combinedStream);
                //set videostream to live feed player
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err: any) {
                alert(err?.message);
            }
            } else {
            alert("The MediaRecorder API is not supported in your browser.");
            }
        }
        open && handleGetPermissions()
    },[open])


    const startRecording = async () => {
      setRecordingStatus("recording");
      const media = new MediaRecorder(stream, { mimeType });
      mediaRecorder.current = media;
      mediaRecorder.current.start();
      let localVideoChunks: any[] = [];
      mediaRecorder.current.ondataavailable = (event: any) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localVideoChunks.push(event.data);
      };
      setVideoChunks(localVideoChunks);
    };

    return (
        <>
        {(
          <Stack
            spacing={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <div className="VideoFileDesctiption">
              {t("VideoRecorder.videoFileDescription")}{" "}
            </div>
            
            {!recordedVideo ? (
                <div className="Video_Player_Container">
                    <video ref={liveVideoFeed} autoPlay className="Video_Player"/>
                    <IconButton className="RecordIcon_Button" onClick={startRecording}>
                        <div className="RecordIcon_Container">
                            <RecordAudioIcon />
                        </div>
                    </IconButton>
                </div>
            ) : null}
            {
              recordedVideo ? (
                <video ref={liveVideoFeed} src={recordedVideo} controls/>
              ):null
            }
          </Stack>
        )}
        </>
    )
  } 
  /***** Dialog Content : Phase 1 --> Get permissions and start recording *****/

  const renderStopRecordingOnClick = () => {

  }
  const renderPlayPauseUploadAndStartOverRecording = () => {

  }

  const onDialogClose = () => {
    handleClose()
  }

  return (
    <>
      <Dialog
        className="VideoRecorderDialog"
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

export default VideoRecorderDialog;
