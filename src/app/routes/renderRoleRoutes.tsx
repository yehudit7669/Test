import { userRoles } from "../../constants";
import useUser from "../../hooks/useUser";
import renderStudentRoutes from "./studentRoutes";
import renderTeacherRoutes from "./teacherRoutes";

const renderRoleRoutes = () => {
  const [user] = useUser();
  const userRole = user?.role;
  const hasUserSignedInBefore: boolean | undefined = user?.hasSignedInBefore;
  console.log("useruseruseruseruseruser", user);
  switch (userRole) {
    case userRoles.STUDENT:
      return renderStudentRoutes({ hasUserSignedInBefore, userRole });

    case userRoles.TEACHER:
      return renderTeacherRoutes({ hasUserSignedInBefore, userRole });

    case userRoles.PARENT:
      return;
    //TODO : Add parent routes function
    //   return renderTeacherRoutes({ hasUserSignedInBefore, userRole });
    default:
      return renderStudentRoutes({ hasUserSignedInBefore, userRole });
  }
};

export default renderRoleRoutes;
