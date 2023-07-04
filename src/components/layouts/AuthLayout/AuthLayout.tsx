import { Outlet, useLocation } from 'react-router-dom'
import '@fontsource/mansalva'
import './AuthLayout.css'
import { routes } from '../../../constants'
import { useTranslation } from 'react-i18next'

function AuthLayout() {
  /* Route dependencies */
  const location = useLocation()

  /* i18n dependencies */
  const { t } = useTranslation()

  /* Function definition to get the title of side navbar dynamically based on route */
  const getSideNavTitleBasedOnRoute = () => {
    const { pathname } = location

    switch (pathname) {
      case `/${routes.SIGN_UP}`:
      case `/${routes.SELECT_ROLE}`:
        return t('AuthLayout.selectRoleCoverDescription')

      case `/${routes.FIRST_LOGIN_STUDENT}`:
        return t('AuthLayout.firstLoginStudentConverDescription')

      case `/${routes.FIRST_LOGIN_PARENT}`:
        return t('AuthLayout.firstLoginParentConverDescription')

      case `/${routes.FIRST_LOGIN_TEACHER}`:
        return t('AuthLayout.firstLoginTeacherConverDescription')

      default:
        return t('AuthLayout.defaultCoverDescription')
    }
  }
  /* Function definition to get the title of side navbar dynamically based on route */

  return (
    <div className="AuthLayout">
      <div className="SideNav">
        <div className="Title">{getSideNavTitleBasedOnRoute()}</div>
      </div>
      <div className="Outlet">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
