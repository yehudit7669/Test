import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SignIn from "../components/pages/Auth/SignIn";
import SignUp from "../components/pages/Auth/SignUp";
import ForgotPassword from "../components/pages/Auth/ForgotPassword";
import AuthLayout from "../components/layouts/AuthLayout";
import { routes } from "../constants";
import useWebSocket from "react-use-websocket";
import { getWSEnv } from "../utils/envUtil";
import RequireAuth from "./requireAuth/RequireAuth";
import useUser from "../hooks/useUser";
import renderRoleRoutes from "./routes/renderRoleRoutes";
import { useEffect } from "react";

function App() {
  const [user] = useUser();
  const userRole = user?.role;
  const hasUserSignedInBefore: boolean | undefined = user?.hasSignedInBefore;
  const location = useLocation();
  const navigate = useNavigate();
  //Connecting websocket
  useWebSocket(getWSEnv(), {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });
  const checkUser = () => {
    if (location.pathname === routes.ROOT) {
      console.log(location.pathname, user);
      if (userRole && hasUserSignedInBefore) {
        navigate(userRole);
      } else {
        navigate(routes.GET_STARTED);
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, [navigate, userRole, hasUserSignedInBefore]);

  return (
    <div className="App">
      <Routes>
        {/* Public Auth routes */}
        <Route path={routes.AUTH} element={<AuthLayout />}>
          <Route index element={<Navigate to={routes.SIGN_IN} replace />} />
          <Route path={routes.SIGN_IN} element={<SignIn />} />
          <Route path={routes.SIGN_UP} element={<SignUp />} />
          <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route
            path={"*"}
            element={<Navigate to={routes.SIGN_IN} replace />}
          />
        </Route>

        {/* Protected Main layout routes */}

        <Route path={routes.ROOT} element={<RequireAuth />}>
          {/* To redirect to get started or dashboard */}
          {/* <Route
            index
            element={
              <Navigate
                to={hasUserSignedInBefore ? userRole : routes.GET_STARTED}
                replace
              />
            }
          /> */}
          {renderRoleRoutes()}
        </Route>

        {/* Any other route page */}
        <Route
          path="/*"
          element={
            <Navigate
              to={hasUserSignedInBefore ? userRole : routes.GET_STARTED}
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
