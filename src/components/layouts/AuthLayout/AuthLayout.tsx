import { Outlet, useLocation } from "react-router-dom";
import "@fontsource/mansalva";
import "./AuthLayout.css";
import { routes } from "../../../constants";

function AuthLayout() {

  /* Route dependencies */
  const location = useLocation();
  /* Route dependencies */

  /* Function definition to get the title of side navbar dynamically based on route */
  const getSideNavTitleBasedOnRoute = () => {
    const { pathname } = location;
    switch (pathname) {
      case routes.AUTH + "/" + routes.BIRTH_DATE:
        return "Join the community of passionate students!";

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
