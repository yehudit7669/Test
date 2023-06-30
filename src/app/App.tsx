import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from '../components/pages/Auth/SignIn'
import SignUpTabs from '../components/pages/Auth/SignUpTabs'
import AuthLayout from '../components/layouts/AuthLayout'
import { routes, userLayouts, userRoles } from '../constants'
import { connect as WSConnect } from '../socket'
import SignUp from '../components/pages/Auth/SignUp'
import renderRoutes from './routes/renderRoutes'
import Worksheet from '../components/pages/Worksheet'
import RequireAuth from './requireAuth/RequireAuth'
import ForgotPassword from '../components/pages/Auth/ForgotPassword'
import { VideoRecorderContextProvider } from '../components/pages/Worksheet/widget/common/videoRecorderDialog/context/videoRecorderContext'
import { VideoPlayerContextProvider } from '../components/pages/Worksheet/widget/common/videoRecorderDialog/context/videoPlayerContext'
import Dashboard from '../components/pages/admin/dashboard/Dashboard'

function App() {
  useEffect(() => {
    WSConnect()
  }, [])

  return (
    <div className="App">
      <VideoRecorderContextProvider>
        <VideoPlayerContextProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              {/* Index route - If user goes to '/' then navigate him to '/sign-in' */}
              <Route
                index
                element={<Navigate to={`/${routes.SIGN_IN}`} replace />}
              />
              {/* Public routes */}
              <Route
                path={`/${routes.ADMIN}/dashboard`}
                element={<Dashboard />}
              />
              <Route path={`/${routes.SIGN_IN}`} element={<SignIn />} />
              <Route path={`/${routes.SELECT_ROLE}`} element={<SignUpTabs />} />
              <Route path={`/${routes.SIGN_UP}`} element={<SignUp />} />
              <Route
                path={`/${routes.FORGOT_PASSWORD}`}
                element={<ForgotPassword />}
              />
              `
              <Route
                path="*"
                element={<Navigate to={routes.SIGN_IN} replace />}
              />
            </Route>

            {/* Protect these routes for auth layout */}
            {renderRoutes(userLayouts.IS_AUTH)}

            {/* Protected routes for main layout */}
            {renderRoutes(userLayouts.IS_MAIN)}
            <Route element={<RequireAuth allowedRole={userRoles.STUDENT} />}>
              <Route path={routes.WORKSHEET} element={<Worksheet />} />
            </Route>
          </Routes>
        </VideoPlayerContextProvider>
      </VideoRecorderContextProvider>
    </div>
  )
}

export default App
