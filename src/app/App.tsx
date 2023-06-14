import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../components/pages/Auth/SignIn";
import SignUpTabs from "../components/pages/Auth/SignUpTabs";
import ForgotPassword from "../components/pages/Auth/ForgotPassword";
import AuthLayout from "../components/layouts/AuthLayout";
import { routes } from "../constants";
import useWebSocket from "react-use-websocket";
import { getWSEnv } from "../utils/envUtil";
import RequireAuth from "./requireAuth/RequireAuth";
import useUser from "../hooks/useUser";
import { useAppSelector } from "../hooks/redux-hooks";
import SignUp from "../components/pages/Auth/SignUp";
import FirstLoginParent from "../components/pages/Auth/firstLoginParent";
import FirstLoginTeacher from "../components/pages/Auth/firstLoginTeacher";
import FirstLoginStudent from "../components/pages/Auth/firstLoginStudent";
import renderRoleRoutes from "./routes/renderRoleRoutes";

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
          {renderRoleRoutes(userRole)}
        </Route>

        {/* Public Auth routes */}
        <Route element={<AuthLayout />}>
          <Route index element={<Navigate to={routes.SIGN_IN} replace />} />
          <Route path={routes.SIGN_IN} element={<SignIn />} />
          <Route path={routes.SIGN_UP} element={<SignUpTabs />} />
          <Route path={routes.SELECT_ROLE} element={<SignUp />} />
          <Route
            path={routes.FIRST_LOGIN_STUDENT}
            element={<FirstLoginStudent />}
          />
          <Route
            path={routes.FIRST_LOGIN_TEACHER}
            element={<FirstLoginTeacher />}
          />
          <Route
            path={routes.FIRST_LOGIN_PARENT}
            element={<FirstLoginParent />}
          />
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
