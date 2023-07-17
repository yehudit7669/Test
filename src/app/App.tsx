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
import { CustomerScreen } from '../components/pages/Admin/AdminDashboard/newCustomerScreen/CustomerScreen.tsx'
import FirstLoginStudent from '../components/pages/Auth/firstLoginStudent/FirstLoginStudent.tsx'
import FirstLoginTeacher from '../components/pages/Auth/firstLoginTeacher/FirstLoginTeacher.tsx'
import FirstLoginParent from '../components/pages/Auth/firstLoginParent/FirstLoginParent.tsx'
import AdminDashboard from '../components/pages/Admin/AdminDashboard'

function App() {
  useEffect(() => {
     WSConnect()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route
          path={`/${routes.ADMIN_DASHBOARD}/${routes.NEW_CUSTOMER}`}
          element={<CustomerScreen />}
        />
        <Route path={routes.CUSTOMER_EDIT} element={<CustomerScreen />} />
        <Route
          path={`/${routes.ADMIN_DASHBOARD}`}
          element={<AdminDashboard />}
        />
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
          <Route
            path={`/${routes.FORGOT_PASSWORD}`}
            element={<ForgotPassword />}
          />
          `
          <Route path="*" element={<Navigate to={routes.SIGN_IN} replace />} />
        </Route>

        {/* Protect these routes for auth layout */}
        {renderRoutes(userLayouts.IS_AUTH)}

        <Route element={<AuthLayout />}>
          {/* Temporary route open for student details for demo */}
          <Route path={`/${routes.GET_STARTED}`}>
            <Route index element={<Navigate to={routes.STUDENT} replace />} />
            <Route
              path={`/${routes.FIRST_LOGIN_STUDENT}`}
              element={<FirstLoginStudent />}
            />
          </Route>
          {/* Temporary route open for student details for demo */}

          {/* Temporary route open for teacher details for demo */}
          <Route path={`/${routes.GET_STARTED}`}>
            <Route index element={<Navigate to={routes.TEACHER} replace />} />
            <Route
              path={`/${routes.FIRST_LOGIN_TEACHER}`}
              element={<FirstLoginTeacher />}
            />
          </Route>
          {/* Temporary route open for teacher details for demo */}

          {/* Temporary route open for parent details for demo */}
          <Route path={`/${routes.GET_STARTED}`}>
            <Route index element={<Navigate to={routes.PARENT} replace />} />
            <Route
              path={`/${routes.FIRST_LOGIN_PARENT}`}
              element={<FirstLoginParent />}
            />
          </Route>
          {/* Temporary route open for parent details for demo */}
        </Route>

        {/* Protected routes for main layout */}
        {renderRoutes(userLayouts.IS_MAIN)}
        <Route element={<RequireAuth allowedRole={userRoles.STUDENT} />}>
          <Route path={routes.WORKSHEET} element={<Worksheet />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
