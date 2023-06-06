import { routes } from "../../constants";
import useUser from "../../hooks/useUser";
import { Navigate, useLocation, Outlet } from "react-router-dom";

type Props = {
  allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: Props) => {
  const location = useLocation();
  const [user] = useUser(); // Destructure the user from the useUser hook
  console.log(user);

  // Check if user and user role exist, and if the allowed roles include the user's role
  const isAuthorized = user && user.role && allowedRoles.includes(user.role);

  return isAuthorized ? (
    <Outlet />
  ) : user?.role ? (
    <Navigate to={routes.AUTH} state={{ from: location }} replace />
  ) : (
    <Navigate to={routes.AUTH} state={{ from: location }} replace />
  );
};

export default RequireAuth;
