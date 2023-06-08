import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "@fontsource/mansalva";
import "./AuthLayout.css";
import { routes } from "../../../constants";
import { useEffect } from "react";
import useUser from "../../../hooks/useUser";

function AuthLayout() {
  /* Route dependencies */
  const location = useLocation();
  const params = useParams();
  const isAuthenticated = useUser();
  const navigate = useNavigate();
  /* Route dependencies */

  /* Function definition to get the title of side navbar dynamically based on route */
  const getSideNavTitleBasedOnRoute = () => {
    const { pathname } = location;
    const { role } = params;

    switch (pathname) {
      case routes.AUTH + "/" + routes.BIRTH_DATE:
        return "Join the community of passionate students!";

      case routes.AUTH + "/" + routes.SIGN_UP:
        return "Join the Wizer community";

      case routes.AUTH + "/" + `sign-up/${role}`:
        return "Join the Wizer community";

      default:
        return "Over 2,500,000 worksheets to explore or create your own.";
    }
  };
  /* Function definition to get the title of side navbar dynamically based on route */

  useEffect(() => {
    if (isAuthenticated[0]) {
      navigate(routes.ROOT);
    }
  }, [navigate]);

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
