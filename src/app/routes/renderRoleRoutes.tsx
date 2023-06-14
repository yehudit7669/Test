import { userRoles } from "../../constants";
import renderStudentRoutes from "./renderStudentRoutes";
import renderTeacherRoutes from "./renderTeacherRoutes";
import renderParentRoutes from "./renderParentRoutes"


const renderRoleRoutes = (userRole:string ) => {
  switch (userRole) {
    case userRoles.STUDENT:
      return renderStudentRoutes({ userRole });

    case userRoles.TEACHER:
      return renderTeacherRoutes({ userRole });

    case userRoles.PARENT:
      return renderParentRoutes({ userRole });
    default:
      return;
  }
};

export default renderRoleRoutes;
