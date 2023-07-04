import { Navigate, Route } from 'react-router-dom'
import MainLayout from '../../components/layouts/MainLayout'
import { routes, userLayouts } from '../../constants'
import StudentDashboard from '../../components/pages/Dashboard/studentDashboard'

type Props = {
  layout: string
}

const renderStudentRoutes = ({ layout }: Props) => {
  switch (layout) {
    case userLayouts.IS_AUTH:
      return (
        <>
          {/* <Route path={`/${routes.GET_STARTED}`}>
            <Route index element={<Navigate to={routes.STUDENT} replace />} />
            <Route
              path={`/${routes.FIRST_LOGIN_STUDENT}`}
              element={<FirstLoginStudent />}
            />
          </Route> */}
        </>
      )
    case userLayouts.IS_MAIN:
      return (
        <>
          <Route path={`/${routes.STUDENT}`} element={<MainLayout />}>
            <Route index element={<Navigate to={routes.DASHBOARD} replace />} />
            <Route path={routes.DASHBOARD} element={<StudentDashboard />} />
          </Route>
        </>
      )
  }
}

export default renderStudentRoutes
