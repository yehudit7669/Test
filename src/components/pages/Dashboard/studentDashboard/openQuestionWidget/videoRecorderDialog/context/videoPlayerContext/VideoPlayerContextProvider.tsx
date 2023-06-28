import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useRef,
} from "react";
import { useToggle } from "../../../../../../../../hooks/useToggle";

type IVideoPlayerContext = {
  isVideoPlayerPaused: boolean;
  setIsVideoPlayerPaused: (value: boolean) => void;
  isVideoPlayerTheaterMode: boolean;
  setIsVideoPlayerTheaterMode: () => void;
  isVideoPlayerFullScreenMode: boolean;
  setIsVideoPlayerFullScreenMode: () => void;
  isVideoPlayerMiniMode: boolean;
  setIsVideoPlayerMiniMode: () => void;
  videoPlayerRef: any;
  videoPlayerContainerRef: any;
  videoPlayerTimelineContainerRef: any;
  videoPlayerVolumeType: string;
  setVideoPlayerVolumeType: Dispatch<SetStateAction<string>>;
  videoPlayerVolumeSliderValue: number | number[] | undefined;
  setVideoPlayerVolumeSliderValue: Dispatch<
    SetStateAction<number | number[] | undefined>
  >;
  videoPlayerTotalTime: number | string;
  setVideoPlayerTotalTime: Dispatch<SetStateAction<number | string>>;
  videoPlayerMaxTimeForSliderValue: number;
  setVideoPlayerMaxTimeForSliderValue: Dispatch<SetStateAction<number>>;
  videoPlayerCurrentTime: number | string;
  setVideoPlayerCurrentTime: Dispatch<SetStateAction<number | string>>;
  videoPlayerPlaybackSpeed: string;
  setVideoPlayerPlaybackSpeed: Dispatch<SetStateAction<string>>;
  timelineSliderValue: number | number[] | undefined;
  setTimelineSliderValue: Dispatch<
    SetStateAction<number | number[] | undefined>
  >;
};

const initialState = {
  isVideoPlayerPaused: true,
  setIsVideoPlayerPaused: () => {},
  isVideoPlayerTheaterMode: false,
  setIsVideoPlayerTheaterMode: () => {},
  isVideoPlayerFullScreenMode: false,
  setIsVideoPlayerFullScreenMode: () => {},
  isVideoPlayerMiniMode: false,
  setIsVideoPlayerMiniMode: () => {},
  videoPlayerRef: null,
  videoPlayerContainerRef: null,
  videoPlayerTimelineContainerRef: null,
  videoPlayerVolumeType: "high",
  setVideoPlayerVolumeType: () => {},
  videoPlayerVolumeSliderValue: 0,
  setVideoPlayerVolumeSliderValue: () => {},
  videoPlayerTotalTime: "",
  setVideoPlayerTotalTime: () => {},
  videoPlayerMaxTimeForSliderValue: 0,
  setVideoPlayerMaxTimeForSliderValue: () => {},
  videoPlayerCurrentTime: "00:00",
  setVideoPlayerCurrentTime: () => {},
  videoPlayerPlaybackSpeed: "1x",
  setVideoPlayerPlaybackSpeed: () => {},
  timelineSliderValue: 0,
  setTimelineSliderValue: () => {},
};

export const VideoPlayerContext = createContext<IVideoPlayerContext | null>(
  initialState
);

type Props = {
  children: React.ReactNode;
};

export const VideoPlayerContextProvider = ({ children }: Props) => {
  const { status: isVideoPlayerPaused, setStatus: setIsVideoPlayerPaused } =
    useToggle(true);
  const {
    status: isVideoPlayerTheaterMode,
    changeStatus: setIsVideoPlayerTheaterMode,
  } = useToggle(false);
  const {
    status: isVideoPlayerFullScreenMode,
    changeStatus: setIsVideoPlayerFullScreenMode,
  } = useToggle(false);
  const {
    status: isVideoPlayerMiniMode,
    changeStatus: setIsVideoPlayerMiniMode,
  } = useToggle(false);
  let videoPlayerRef = useRef<any>(null);
  const videoPlayerContainerRef = useRef<any>(null);
  const videoPlayerTimelineContainerRef = useRef<any>(null);
  const [videoPlayerVolumeType, setVideoPlayerVolumeType] = useState("high");
  const [videoPlayerVolumeSliderValue, setVideoPlayerVolumeSliderValue] =
    useState<number | number[] | undefined>(0);
  const [videoPlayerTotalTime, setVideoPlayerTotalTime] = useState<
    number | string
  >("");
  const [videoPlayerMaxTimeForSliderValue, setVideoPlayerMaxTimeForSliderValue] = useState(0)
  const [videoPlayerCurrentTime, setVideoPlayerCurrentTime] = useState<
    number | string
  >("00:00");
  const [videoPlayerPlaybackSpeed, setVideoPlayerPlaybackSpeed] =
    useState("1x");
  const [timelineSliderValue, setTimelineSliderValue] = useState<
    number | number[] | undefined
  >(0);

  return (
    <>
      <VideoPlayerContext.Provider
        value={{
          isVideoPlayerPaused,
          setIsVideoPlayerPaused,
          isVideoPlayerTheaterMode,
          setIsVideoPlayerTheaterMode,
          isVideoPlayerFullScreenMode,
          setIsVideoPlayerFullScreenMode,
          isVideoPlayerMiniMode,
          setIsVideoPlayerMiniMode,
          videoPlayerRef,
          videoPlayerContainerRef,
          videoPlayerTimelineContainerRef,
          videoPlayerVolumeType,
          setVideoPlayerVolumeType,
          videoPlayerVolumeSliderValue,
          setVideoPlayerVolumeSliderValue,
          videoPlayerTotalTime,
          setVideoPlayerTotalTime,
          videoPlayerMaxTimeForSliderValue,
          setVideoPlayerMaxTimeForSliderValue,
          videoPlayerCurrentTime,
          setVideoPlayerCurrentTime,
          videoPlayerPlaybackSpeed,
          setVideoPlayerPlaybackSpeed,
          timelineSliderValue,
          setTimelineSliderValue,
        }}
      >
        {children}
      </VideoPlayerContext.Provider>
    </>
  );
};
