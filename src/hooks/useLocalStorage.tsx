import { useState } from 'react'

// Custom hook for managing a token stored in the local storage
const useLocalStorage = (): [string | null, (newToken: string) => void] => {
  // State variable to store the token value
  const [token, setTokenInternal] = useState<string | null>(() => {
    // Retrieve the token from the local storage
    const decodedToken = localStorage.getItem('token')
    // Decode the token using the decode function

    return decodedToken ? decodeURIComponent(decodedToken) : null
  })

  // Function to update the token value
  const setToken = (newToken: string) => {
    // Encode the new token using the encode function from the string-encode-decode library
    const encodedToken = encodeURIComponent(newToken)
    // Store the encoded token in the local storage
    localStorage.setItem('token', encodedToken)
    // Update the token state variable with the new token value
    setTokenInternal(newToken)
  }

  // Return the token value and the setToken function as a tuple
  return [token, setToken]
}

export default useLocalStorage
