import { routes } from "../../constants";
import useUser from "../../hooks/useUser";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  const [user] = useUser(); // Destructure the user from the useUser hook
  console.log(user);

  // Check if user and user role exist, and if the allowed roles include the user's role
  const isAuthorized = user && user.role;

  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to={routes.SIGN_IN} state={{ from: location }} replace />
  );
};

export default RequireAuth;
