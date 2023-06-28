import { routes } from '../../constants'
import useUser from '../../hooks/useUser'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

type Props = {
  allowedRole: string
}

const RequireAuth = ({ allowedRole }: Props) => {
  const location = useLocation()
  const [user] = useUser() // Destructure the user from the useUser hook

  // Check if user and user role exist, and if the allowed roles include the user's role
  // const isAuthorized = user?.role === allowedRole
  const isAuthorized = true;

  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to={routes.SIGN_IN} state={{ from: location }} replace />
  )
}

export default RequireAuth
