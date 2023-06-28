import { useVideoPlayerContext } from "../../context/videoPlayerContext";
import "../VideoPlayer.css"
type Props = {
  videoSrcRef: any;
};
export default function RenderPlayPauseVideo({ videoSrcRef }: Props) {
  /* Context dependencies */
  let { videoPlayerRef } = useVideoPlayerContext();
  /* Context dependencies */


  /* Function definition to play and pause video player */
  const handlePlayPauseToggleButton = () => {
    let ref;
    if (videoSrcRef && videoSrcRef !== undefined && videoSrcRef !== null) {
      ref = videoSrcRef;
    } else {
      ref = videoPlayerRef;
    }
    ref.current.paused ? ref.current.play() : ref.current.pause();
  };
  /* Function definition to play and pause video player */

  return (
    <>
      <button className="Play_Pause_Btn" onClick={handlePlayPauseToggleButton}>
        <svg className="Play_Icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
        </svg>
        <svg className="Pause_Icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
        </svg>
      </button>
    </>
  );
}
