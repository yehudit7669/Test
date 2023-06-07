import { Navigate, Route } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";
import AuthLayout from "../../components/layouts/AuthLayout";
import { routes } from "../../constants";

type Props = {
  userRole: string;
};

const renderTeacherRoutes = ({ userRole }: Props) => {
  // Render routes for students who have signed in before
  return (
    <>
      <Route path={userRole} element={<MainLayout />}>
        <Route index element={<Navigate to={routes.DASHBOARD} replace />} />
        <Route
          path={routes.DASHBOARD}
          element={<h1>HELLO Parent {userRole}</h1>}
        />
        <Route path={routes.ANY} element={<Navigate to={userRole} replace />} />
      </Route>
      <Route path={routes.GET_STARTED} element={<AuthLayout />}>
        {/* <Route index element={<Navigate to={routes.STUDENT_DOB} replace />} />
        <Route path={routes.STUDENT_DOB} element={<h2>Student DOB</h2>} /> */}
        {/* <Route
          path={routes.ANY}
          element={<Navigate to={routes.GET_STARTED} replace />}
        /> */}
      </Route>
    </>
  );
};

export default renderTeacherRoutes;
