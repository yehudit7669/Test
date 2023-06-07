import { useNavigate } from "react-router-dom";
import { Typography, Card, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import Actions from "../../../actions";

import { useAppDispatch } from "../../../hooks/redux-hooks";
import {
  JoinAsParentIcon,
  JoinAsStudentIcon,
  JoinAsTeacherIcon,
} from "../../../assets/svgs/svg-components.tsx";

function SignIn() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const renderTitle = () => (
    <Typography className="Title">{t("SignUp.registerToWizer")}</Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("SignUp.discoverWizer")}
    </Typography>
  );

  /* Select role data dependency */
  const roleData = [
    {
      title: t("Role.teacher"),
      description: t("SignUp.joinAsTeacherDescription"),
      icon: <JoinAsTeacherIcon />,
      role: "teacher",
    },
    {
      title: t("Role.student"),
      description: t("SignUp.joinAsStudentDescription"),
      icon: <JoinAsStudentIcon />,
      role: "student",
    },
    {
      title: t("Role.parent"),
      description: t("SignUp.joinAsParentDescription"),
      icon: <JoinAsParentIcon />,
      role: "parent",
    },
  ];
  /* Select role data dependency */

  /* Role tabs component */
  const selectRoleTabs = () => {
    const handleSelectRole = (role: string) => {
      navigate(role);
    };
    return (
      <>
        <div className="RoleWrapper">
          {roleData?.map((_data, index) => {
            return (
              <Card
                className="RoleCard"
                onClick={() => handleSelectRole(_data.role)}
                key={index}
              >
                <div>{_data.icon}</div>
                <div>
                  <Typography>{t("SignUp.joinAs")}</Typography>
                  <Typography>{_data.title}</Typography>
                </div>
                <CardContent>{_data.description}</CardContent>
              </Card>
            );
          })}
        </div>
      </>
    );
  };
  /* Role tabs component */

  return (
    <div className="SignUp">
      <div className="Wrapper">
        {renderTitle()}
        {renderSubTitle()}
        {selectRoleTabs()}
      </div>
    </div>
  );
}

export default SignIn;
