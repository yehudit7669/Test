import { Navigate, Route } from 'react-router-dom'
import MainLayout from '../../components/layouts/MainLayout'
import { routes, userLayouts } from '../../constants'
import FirstLoginParent from '../../components/pages/Auth/firstLoginParent'
import ParentDashboard from '../../components/pages/Dashboard/parentDashboard'

type Props = {
  layout: string
}

const renderParentRoutes = ({ layout }: Props) => {
  // Render routes for students who have signed in before
  switch (layout) {
    case userLayouts.IS_AUTH:
      return (
        <>
          <Route path={`/${routes.GET_STARTED}`}>
            <Route index element={<Navigate to={routes.PARENT} replace />} />
            <Route
              path={`/${routes.FIRST_LOGIN_PARENT}`}
              element={<FirstLoginParent />}
            />
          </Route>
        </>
      )
    case userLayouts.IS_MAIN:
      return (
        <>
          <Route path={`/${routes.PARENT}`} element={<MainLayout />}>
            <Route index element={<Navigate to={'dashboard'} replace />} />
            <Route path={routes.DASHBOARD} element={<ParentDashboard />} />
          </Route>
        </>
      )
    default:
      break
  }
  return <></>
}

export default renderParentRoutes
