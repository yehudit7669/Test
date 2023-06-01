import { Outlet } from "react-router-dom"

import "@fontsource/mansalva"
import "./Auth.css"

function AuthLayout() {
  return (
    <div className="AuthLayout">
      <div className="SideNav">
        <div className="Title">
          Over 2,500,000 worksheets to explore or create your own.
        </div>
      </div>
      <div className="Outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout