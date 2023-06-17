import { userLayouts, userRoles } from "../../constants";
import { Route } from "react-router-dom";
import RequireAuth from "../requireAuth/RequireAuth";
import renderStudentRoutes from "./renderStudentRoutes";
import renderParentRoutes from "./renderParentRoutes";
import renderTeacherRoutes from "./renderTeacherRoutes";
import AuthLayout from "../../components/layouts/AuthLayout";

const renderRoutes = (layout: string) => {
  switch (layout) {
    /* Render protected routes for AuthLayout */
    case userLayouts.IS_AUTH:
      return (
        <>
          <Route element={<AuthLayout />}>
            <Route element={<RequireAuth allowedRole={userRoles.STUDENT} />}>
              {renderStudentRoutes({ layout })}
            </Route>

            <Route element={<RequireAuth allowedRole={userRoles.PARENT} />}>
              {renderParentRoutes({ layout })}
            </Route>

            <Route element={<RequireAuth allowedRole={userRoles.TEACHER} />}>
              {renderTeacherRoutes({ layout })}
            </Route>
          </Route>
        </>
      );

    /* Render protected routes for MainLayout */
    case userLayouts.IS_MAIN:
      return (
        <>
          <Route element={<RequireAuth allowedRole={userRoles.STUDENT} />}>
            {renderStudentRoutes({ layout })}
          </Route>

          <Route element={<RequireAuth allowedRole={userRoles.PARENT} />}>
            {renderParentRoutes({ layout })}
          </Route>

          <Route element={<RequireAuth allowedRole={userRoles.TEACHER} />}>
            {renderTeacherRoutes({ layout })}
          </Route>
        </>
      );
    default:
      return;
  }
};

export default renderRoutes;
