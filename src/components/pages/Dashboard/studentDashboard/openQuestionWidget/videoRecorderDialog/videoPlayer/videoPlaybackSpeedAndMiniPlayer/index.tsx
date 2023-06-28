import { useVideoPlayerContext } from "../../context/videoPlayerContext";


type Props = {
  videoSrcRef : any
}

export default function RenderVideoPlaybackSpeedAndMiniPlayer({videoSrcRef}:Props) {
  /* Context dependencies */
  const {
    videoPlayerPlaybackSpeed,
    setVideoPlayerPlaybackSpeed,
    isVideoPlayerMiniMode,
    setIsVideoPlayerMiniMode,
  } = useVideoPlayerContext();

  let {videoPlayerRef} = useVideoPlayerContext()
  /* Context dependencies */


  /* Function definition to change the playback speed */
  const handleChangePlaybackSpeed = () => {
    let newPlaybackSpeed = videoSrcRef.current.playbackRate + 0.25;
    if (newPlaybackSpeed > 2) newPlaybackSpeed = 0.25;
    videoSrcRef.current.playbackRate = newPlaybackSpeed;
    setVideoPlayerPlaybackSpeed(`${newPlaybackSpeed}x`);
  };
  /* Function definition to change the playback speed */

  /* Function definition to toggle the mini player button */
  const handleToggleMiniPlayer = () => {
    if (isVideoPlayerMiniMode) {
      document.exitPictureInPicture();
    } else {
      videoSrcRef.current.requestPictureInPicture();
    }
    setIsVideoPlayerMiniMode();
  };
  /* Function definition to toggle the mini player button */

  return (
    <>
      <button
        className="Speed_Btn wide-btn"
        onClick={handleChangePlaybackSpeed}
      >
        {videoPlayerPlaybackSpeed}
      </button>
      <button className="Mini_Player_Btn" onClick={handleToggleMiniPlayer}>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
          />
        </svg>
      </button>
    </>
  );
}
