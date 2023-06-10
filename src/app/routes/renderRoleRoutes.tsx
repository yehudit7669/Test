import { userRoles } from "../../constants";
import renderStudentRoutes from "./studentRoutes";
import renderTeacherRoutes from "./teacherRoutes";



const renderRoleRoutes = (userRole:string) => {

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
