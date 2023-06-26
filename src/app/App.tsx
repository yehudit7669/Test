import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import SignIn from '../components/pages/Auth/SignIn'
import SignUpTabs from '../components/pages/Auth/SignUpTabs'
import AuthLayout from '../components/layouts/AuthLayout'
import { routes, userLayouts } from '../constants'
import { connect as WSConnect } from '../socket'
import SignUp from '../components/pages/Auth/SignUp'
import renderRoutes from './routes/renderRoutes'
import Worksheet from '../components/pages/Worksheet'

function App() {
  const path = useLocation()
  console.log(path)
  useEffect(() => {
    WSConnect()
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path={routes.WORKSHEET} element={<Worksheet />} />
        <Route element={<AuthLayout />}>
          {/* Index route - If user goes to '/' then navigate him to '/sign-in' */}
          <Route
            index
            element={<Navigate to={`/${routes.SIGN_IN}`} replace />}
          />

          {/* Public routes */}
          <Route path={`/${routes.SIGN_IN}`} element={<SignIn />} />
          <Route path={`/${routes.SELECT_ROLE}`} element={<SignUpTabs />} />
          <Route path={`/${routes.SIGN_UP}`} element={<SignUp />} />
          <Route path="*" element={<Navigate to={routes.SIGN_IN} replace />} />
        </Route>

        {/* Protect these routes for auth layout */}
        {renderRoutes(userLayouts.IS_AUTH)}

        {/* Protected routes for main layout */}
        {renderRoutes(userLayouts.IS_MAIN)}
      </Routes>
    </div>
  )
}

export default App
