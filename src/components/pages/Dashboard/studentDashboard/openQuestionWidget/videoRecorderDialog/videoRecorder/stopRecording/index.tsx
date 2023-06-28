import StopIcon from "@mui/icons-material/Stop";
import {useVideoRecorderContext} from "../../context/videoRecorderContext";
import {IconButton} from "@mui/material";

/* Sub component - 4 --> Stop recording */
export default function RenderStopRecording(){

    /* Context dependencies */
    const {mediaRecorder, setPermission, setRecordingStatus, handlePauseVideoRecording, videoChunks, mimeType, setRecordedVideo, setVideoChunks} = useVideoRecorderContext()
    /* Context dependencies */

    /* Function definition to stop the recording */
    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        handlePauseVideoRecording();
        mediaRecorder.current.stop();
        // mediaRecorder.current.src = "";
        // liveVideoFeed.current.srcObject.getTracks()[0].stop();
        mediaRecorder.current.onstop = () => {
          const videoBlob = new Blob(videoChunks, { type: mimeType });
          const videoUrl = URL.createObjectURL(videoBlob);
          console.log(videoUrl,'videoUrl')
          setRecordedVideo(videoUrl);
          setVideoChunks([]);
        };
      };
      /* Function definition to stop the recording */
    return (
        <>
        <IconButton className="Stop_Btn" onClick={stopRecording}>
          <StopIcon className="Stop_Icon" sx={{ color: "white" }} />
        </IconButton>
        </>
    )
}
/* Sub component - 4 --> Stop recording */