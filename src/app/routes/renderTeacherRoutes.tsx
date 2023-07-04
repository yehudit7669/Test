import { Navigate, Route } from 'react-router-dom'
import MainLayout from '../../components/layouts/MainLayout'
import { routes, userLayouts } from '../../constants'
import TeacherDashboard from '../../components/pages/Dashboard/teacherDashboard'

type Props = {
  layout: string
}

const renderTeacherRoutes = ({ layout }: Props) => {
  switch (layout) {
    case userLayouts.IS_AUTH:
      return (
        <>
          {/* <Route path={`/${routes.GET_STARTED}`}>
            <Route index element={<Navigate to={routes.TEACHER} replace />} />
            <Route
              path={`/${routes.FIRST_LOGIN_TEACHER}`}
              element={<FirstLoginTeacher />}
            />
          </Route> */}
        </>
      )

    case userLayouts.IS_MAIN:
      return (
        <>
          <Route path={`/${routes.TEACHER}`} element={<MainLayout />}>
            <Route index element={<Navigate to={routes.DASHBOARD} replace />} />
            <Route path={routes.DASHBOARD} element={<TeacherDashboard />} />
          </Route>
        </>
      )
    default:
      return
  }
}

export default renderTeacherRoutes
