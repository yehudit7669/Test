import { useVideoPlayerContext } from "../../context/videoPlayerContext";
import "../VideoPlayer.css"
export default function RenderVideoDuration() {
  /* Context dependencies */
  const { videoPlayerCurrentTime, videoPlayerTotalTime } =
    useVideoPlayerContext();
  /* Context dependencies */
  return (
    <>
      <div className="Duration_Container">
        <div className="Current_Time">{videoPlayerCurrentTime}</div>/
        <div className="Total_Time">{videoPlayerTotalTime}</div>
      </div>
    </>
  );
}
