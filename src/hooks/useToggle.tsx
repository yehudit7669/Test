import { useState } from 'react'

export const useToggle = (toggleVal: boolean) => {
  const [status, setStatus] = useState(!toggleVal ? false : toggleVal)

  const changeStatus = () => setStatus((prevValue) => !prevValue)
  return {
    status,
    changeStatus,
    setStatus,
  }
}
