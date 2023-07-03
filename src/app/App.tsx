import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from '../components/pages/Auth/SignIn'
import SignUpTabs from '../components/pages/Auth/SignUpTabs'
import AuthLayout from '../components/layouts/AuthLayout'
import { routes, userLayouts } from '../constants'
import { connect as WSConnect } from '../socket'
import SignUp from '../components/pages/Auth/SignUp'
import renderRoutes from './routes/renderRoutes'
import { NewCustomerScreen } from '../components/pages/Admin/AdminDashboard/newCustomerScreen/NewCustomerScreen.tsx'
import AdminDashboard from '../components/pages/Admin/AdminDashboard/AdminDashboard.tsx'

function App() {
  useEffect(() => {
    WSConnect()
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route
          path={`/${routes.ADMIN}/dashboard/new-customer`}
          element={<NewCustomerScreen />}
        />
        <Route
          path={`/${routes.ADMIN}/dashboard`}
          element={<AdminDashboard />}
        />
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
