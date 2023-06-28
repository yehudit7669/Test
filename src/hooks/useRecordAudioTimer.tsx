import { useState, useRef } from "react";

export const useTimer = (audioDuration: number) => {
  const [duration, setDuration] = useState(audioDuration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef: any = useRef(null);

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
        setDuration((prevValue) => prevValue + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false)
  };

  const handleResume = () => {
    setIsPaused(true)
    countRef.current = setInterval(() => {
        setDuration((prevValue) => prevValue + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setDuration(0)
  }


  return { duration, isActive, isPaused, handleStart, handlePause, handleResume, handleReset }
};



export const formatTime = (audioDuration:number) => {
    const getSeconds = `0${(audioDuration % 60)}`.slice(-2)
    const minutes = Math.floor(audioDuration / 60)
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(audioDuration / 3600)}`.slice(-2)
    
    return Number(getHours) > 0 ? `${getHours}:${getMinutes}:${getSeconds}` : `${getMinutes}:${getSeconds}` 
  }