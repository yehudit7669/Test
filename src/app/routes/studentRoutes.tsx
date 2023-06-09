import { Navigate, Route } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";
import AuthLayout from "../../components/layouts/AuthLayout";
import { routes } from "../../constants";
import BirthDateComponent from "../../components/pages/Auth/BirthDateComponent";

type Props = {
  userRole: string;
};

const renderStudentRoutes = ({ userRole }: Props) => {
  // Render routes for students who have signed in before
  return (
    <>
      <Route path={userRole} element={<MainLayout />}>
        <Route index element={<Navigate to={routes.DASHBOARD} replace />} />
        <Route path={routes.DASHBOARD} element={<h1>HELLO STUDENT</h1>} />
        <Route path={routes.ANY} element={<Navigate to={userRole} replace />} />
      </Route>
      <Route path={routes.GET_STARTED} element={<AuthLayout />}>
        <Route index element={<Navigate to={routes.BIRTH_DATE} replace />} />
        <Route path={routes.BIRTH_DATE} element={<BirthDateComponent />} />
      </Route>
    </>
  );
};

export default renderStudentRoutes;