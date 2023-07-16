import { useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage'

// Define the User type
type User = {
  role: string
  email: string
  hasSignedInBefore: boolean
  // Add other properties if necessary
}

// Custom hook for managing user authentication
const useUser = (): [User | null] => {
  const [token] = useLocalStorage()

  // Function to extract the user payload from the token
  const getPayloadFromToken = (token: string) => {
    // Split the token into parts and extract the payload (middle part)
    const encodedPayload = token.split('.')[1]
    // Decode the payload using the base64 atob function and parse it as User type
    return JSON.parse(atob(encodedPayload)) as User // Type assertion to User type
  }

  // State variable to store the user object
  const [user, setUser] = useState<User | null>(() => {
    // If no token exists, set the initial user value to null
    if (!token) return null
    // If a token exists, decode it and set the initial user value to the payload
    return getPayloadFromToken(token)
  })

  // Effect to update the user whenever the token changes
  useEffect(() => {
    if (!token) {
      // If no token exists, set the user to null
      setUser(null)
    } else {
      // If a token exists, decode it and set the user to the payload
      setUser(getPayloadFromToken(token))
    }
  }, [token])

  // Return the user object
  return [user]
}

export default useUser
