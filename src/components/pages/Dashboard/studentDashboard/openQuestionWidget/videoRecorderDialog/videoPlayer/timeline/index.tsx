import { Slider } from "@mui/material";
import { useVideoPlayerContext } from "../../context/videoPlayerContext";
import "../VideoPlayer.css";
import { forwardRef } from 'react'

type Props = {
  isStandAloneVideoPlayer : boolean;
}

/* Sub component - 1 --> Time line for video player */
const RenderTimeline = forwardRef(({isStandAloneVideoPlayer}:Props,ref) => {
  
  /* Context dependencies */
  const {
    timelineSliderValue,
    setTimelineSliderValue,
    videoPlayerMaxTimeForSliderValue,
    videoPlayerRef
  } = useVideoPlayerContext();
  /* Context dependencies */

  const handleSliderTimelineChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setTimelineSliderValue(newValue);
    let tempRef
    if (isStandAloneVideoPlayer) {
      tempRef = ref
    } else {
      tempRef = videoPlayerRef
    }
    tempRef.current.currentTime = (event.target as HTMLInputElement).value;
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
})

export default RenderTimeline
/* Sub component - 1 --> Time line for video player */
