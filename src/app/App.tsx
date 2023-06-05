import { Routes, Route, Link } from "react-router-dom";
import SignIn from "../components/pages/Auth/SignIn";
import SignUp from "../components/pages/Auth/SignUp";
import ForgotPassword from "../components/pages/Auth/ForgotPassword";
import MainLayout from "../components/layouts/MainLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import { routes } from "../constants";
import AuthRoute from "./authRoutes/AuthRoute";
import useWebSocket from "react-use-websocket";
import { getWSEnv } from "../utils/envUtil";

function App() {
  useWebSocket(getWSEnv(), {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  return (
    <div className="App">
      <Routes>
        {/* Auth routes */}
        <Route path={routes.AUTH} element={<AuthLayout />}>
          <Route index element={<SignIn />} />
          <Route path={routes.SIGN_UP} element={<SignUp />} />
          <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
        </Route>
        {/* Main layout routes */}
        <Route
          path={routes.ROOT}
          element={
            <AuthRoute>
              <MainLayout />
            </AuthRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
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
