import { useContext } from "react"
import { VideoRecorderContext } from "./VideoRecorderContextProvider"

export const useVideoRecorderContext = () => {  
  const ctx = useContext(VideoRecorderContext) 
  if (ctx === null) {
    throw new Error("Video state has not been configured, value is null");
  } else if (ctx === undefined) {
    throw new Error("You're attempting to access video state outside of the Video context provider");
  }
  return ctx
}