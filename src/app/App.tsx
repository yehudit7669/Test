import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from '../components/pages/Auth/SignIn'
import SignUpTabs from '../components/pages/Auth/SignUpTabs'
import AuthLayout from '../components/layouts/AuthLayout'
import { routes, userLayouts } from '../constants'
import { socket } from '../socket'
import SignUp from '../components/pages/Auth/SignUp'
import renderRoutes from './routes/renderRoutes'

function App() {
  useEffect(() => {
    function onConnect() {
      console.log('Socket Connected!');
    }

    function onDisconnect() {
      console.log('Socket Disconnected!');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route element={<AuthLayout />}>
          {/* Index route - If user goes to '/' then navigate him to '/sign-in' */}
          <Route
            index
            element={<Navigate to={`/${routes.SIGN_IN}`} replace />}
          />
          {/* Index route - If user goes to '/' then navigate him to '/sign-in' */}

          {/* Public routes */}
          <Route path={`/${routes.SIGN_IN}`} element={<SignIn />} />
          <Route path={`/${routes.SELECT_ROLE}`} element={<SignUpTabs />} />
          <Route path={`/${routes.SIGN_UP}`} element={<SignUp />} />
          {/* Public routes */}
          <Route path="*" element={<Navigate to={routes.SIGN_IN} replace />} />
        </Route>

        {/* Protect these routes for auth layout */}
        {renderRoutes(userLayouts.IS_AUTH)}
        {/* Protect these routes for auth layout */}

        {/* Protected routes for main layout */}
        {renderRoutes(userLayouts.IS_MAIN)}
        {/* Protected routes for main layout */}

        {/* <Route
          path="*"
          element={<Navigate to={ routes.SIGN_IN} replace />}
          />   */}
      </Routes>
    </div>
  )
}

export default App
