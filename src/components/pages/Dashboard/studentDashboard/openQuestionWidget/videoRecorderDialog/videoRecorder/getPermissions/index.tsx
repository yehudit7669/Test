import { RecordAudioIcon } from "../../../../../../../../assets/svgs/svg-components";
import {useVideoRecorderContext} from "../../context/videoRecorderContext";
import {IconButton} from "@mui/material";

/* Sub component - 1 --> Get permissions */
export default function RenderGetPermissions(){

    /* Context dependencies */
    const { setRecordedVideo, setPermission, setStream, liveVideoFeed} = useVideoRecorderContext()
    /* Context dependencies */

    /* Function definition to Get permissions to record a video */
    const handleGetPermissions = async () => {
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
      };
      /* Function definition to Get permissions to record a video */

    return  (
        <>
        <div className="GetPermissions_Container">
          <IconButton
            className="RecordIcon_Button"
            onClick={handleGetPermissions}
          >
            <div className="RecordIcon_Container">
              <RecordAudioIcon />
            </div>
          </IconButton>
        </div>
        </>
    )
}
/* Sub component - 1 --> Get permissions */