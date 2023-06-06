import { Routes, Route, Link, Navigate } from "react-router-dom";
import SignIn from "../components/pages/Auth/SignIn";
import SignUp from "../components/pages/Auth/SignUp";
import ForgotPassword from "../components/pages/Auth/ForgotPassword";
import MainLayout from "../components/layouts/MainLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import { routes } from "../constants";
import useWebSocket from "react-use-websocket";
import { getWSEnv } from "../utils/envUtil";
import RequireAuth from "./requireAuth/RequireAuth";

function App() {
  //Connecting websocket
  useWebSocket(getWSEnv(), {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

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

        <Route element={<RequireAuth allowedRoles={["student"]} />}>
          <Route path={routes.ROOT} element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route
              path={routes.FIRST_TIME_SIGN_IN_STUDENT}
              element={<Home />}
            />

            <Route
              path={routes.STUDENT_DASHBOARD}
              element={<h1>Hello teacher</h1>}
            />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["teacher"]} />}>
          <Route path={routes.ROOT} element={<MainLayout />}>
            <Route index element={<Home />} />

            <Route
              path={routes.FIRST_TIME_SIGN_IN_TEACHER}
              element={<h1>Hello teacher</h1>}
            />

            <Route
              path={routes.TEACHER_DASHBOARD}
              element={<h1>Hello teacher</h1>}
            />
          </Route>
        </Route>

        {/* Any other route page */}
        <Route path="/*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
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
