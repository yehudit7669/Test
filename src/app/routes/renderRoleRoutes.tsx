import { userRoles } from "../../constants";
import { useAppSelector } from "../../hooks/redux-hooks";
import useUser from "../../hooks/useUser";
import renderStudentRoutes from "./studentRoutes";
import renderTeacherRoutes from "./teacherRoutes";

const renderRoleRoutes = () => {
  const [user] = useUser();
  const userInfo = useAppSelector((state) => state.auth.user);
  const userRole = user?.role || userInfo?.role;

  switch (userRole) {
    case userRoles.STUDENT:
      return renderStudentRoutes({ userRole });

    case userRoles.TEACHER:
      return renderTeacherRoutes({ userRole });

    case userRoles.PARENT:
      return renderTeacherRoutes({ userRole });
    default:
      return;
  }
};

export default renderRoleRoutes;
