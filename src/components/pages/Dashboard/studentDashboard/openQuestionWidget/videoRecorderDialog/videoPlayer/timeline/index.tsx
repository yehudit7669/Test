import { Slider } from "@mui/material";
import { useVideoPlayerContext } from "../../context/videoPlayerContext";
import "../VideoPlayer.css";

type Props = {
  videoSrcRef: any;
};

/* Sub component - 1 --> Time line for video player */
export default function RenderTimeline({ videoSrcRef }: Props) {
  /* Context dependencies */
  const {
    timelineSliderValue,
    setTimelineSliderValue,
    videoPlayerMaxTimeForSliderValue,
  } = useVideoPlayerContext();
  let { videoPlayerRef } = useVideoPlayerContext();
  /* Context dependencies */

  const handleSliderTimelineChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setTimelineSliderValue(newValue);
    let ref;
    if (videoSrcRef && videoSrcRef !== null && videoSrcRef !== undefined) {
      ref = videoSrcRef;
    } else {
      ref = videoPlayerRef;
    }
    videoSrcRef.current.currentTime = (event.target as HTMLInputElement).value;
  };
  return (
    <>
      <Slider
        className="Timeline_Container"
        min={0}
        max={videoPlayerMaxTimeForSliderValue}
        value={timelineSliderValue}
        onChange={handleSliderTimelineChange}
      />
    </>
  );
}
/* Sub component - 1 --> Time line for video player */
