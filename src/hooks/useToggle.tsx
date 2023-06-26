import {useState} from "react";

export const useToggle = () => {
    const [status, setStatus] = useState(false)

    const changeStatus = () => setStatus((prevValue)=> !prevValue)
    return {
        status, changeStatus, setStatus
    }
}