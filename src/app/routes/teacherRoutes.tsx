import { Navigate, Route } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";
import AuthLayout from "../../components/layouts/AuthLayout";
import { routes } from "../../constants";

type Props = {
  hasUserSignedInBefore: boolean | undefined;
  userRole: string | undefined;
};

const renderTeacherRoutes = ({ hasUserSignedInBefore, userRole }: Props) => {
  if (hasUserSignedInBefore) {
    // Render routes for teachers who have signed in before
    return (
      <Route path={userRole} element={<MainLayout />}>
        <Route index element={<Navigate to={routes.DASHBOARD} replace />} />
        <Route path={routes.DASHBOARD} element={<h1>HELLO {userRole}</h1>} />
      </Route>
    );
  } else {
    // Render routes for teachers who are signing in for the first time
    return (
      <Route path={routes.GET_STARTED} element={<AuthLayout />}>
        {/* TODO : ADD first sign in teacher routes */}
        {/* <Route index element={<Navigate to={routes.STUDENT_DOB} replace />} />
        <Route path={routes.STUDENT_DOB} element={<h2>{userRole} DOB</h2>} /> */}
        {/* <Route path={routes.ANY} element={<Navigate to={routes.DASHBOARD} replace />} />  */}
      </Route>
    );
  }
};

export default renderTeacherRoutes;
