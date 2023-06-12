import { Outlet, useLocation, useParams } from "react-router-dom";
import "@fontsource/mansalva";
import "./AuthLayout.css";
import { routes } from "../../../constants";

function AuthLayout() {
  /* Route dependencies */
  const location = useLocation();
  const params = useParams();

  /* Function definition to get the title of side navbar dynamically based on route */
  const getSideNavTitleBasedOnRoute = () => {
    const { pathname } = location;
    const { role } = params;

    switch (pathname) {
      case `${routes.GET_STARTED}/${routes.BIRTH_DATE}`:
        return "Join the community of passionate students!";

      case `/${routes.SIGN_UP}`:
      case `/${routes.SIGN_UP}/${role}`:
        return "Join the Wizer community";

      default:
        return "Over 2,500,000 worksheets to explore or create your own.";
    }
  };
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
  );
}

export default AuthLayout;
