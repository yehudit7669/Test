import { Routes, Route, Navigate } from "react-router-dom";
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
import { useAppSelector } from "../hooks/redux-hooks";
import JoinWizerSignUpPage from "../components/pages/Auth/JoinWizerSignUpPage";

function App() {
  const [user] = useUser();
  const userInfo = useAppSelector((state) => state.auth.user);
  const userRole = user?.role || userInfo?.role;

  //Connecting websocket
  useWebSocket(getWSEnv(), {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  return (
    <div className="App">
      <Routes>
        {/* Protected Main layout routes */}
        <Route path={routes.ROOT} element={<RequireAuth />}>
          {/* To redirect to get started or dashboard */}
          <Route index element={<Navigate to={userRole} replace />} />
          {renderRoleRoutes()}
        </Route>

        {/* Public Auth routes */}
        <Route element={<AuthLayout />}>
          <Route index element={<Navigate to={routes.SIGN_IN} replace />} />
          <Route path={routes.SIGN_IN} element={<SignIn />} />
          <Route path={routes.SIGN_UP} element={<SignUp />} />
          <Route path={routes.SELECT_ROLE} element={<JoinWizerSignUpPage />} />
          <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
        </Route>

        {/* Any other route page */}
        <Route
          path="*"
          element={
            <Navigate to={userRole ? routes.ROOT : routes.SIGN_IN} replace />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
