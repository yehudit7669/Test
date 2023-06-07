import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import { useEffect, useState } from "react";
import Actions from "../../../actions";
import { getUser } from "../../../services/auth/authServices";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import {
  GoogleIcon,
  JoinAsParentIcon,
  JoinAsStudentIcon,
  JoinAsTeacherIcon,
  MicrosoftIcon,
} from "../../../assets/svgs/svg-components.tsx";
import useLocalStorage from "../../../hooks/useLocalStorage.tsx";
import useUser from "../../../hooks/useUser.tsx";
import { routes } from "../../../constants/routeConsts.tsx";

function SignIn() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.auth.user);
  const [, setToken] = useLocalStorage();
  const isAuthenticated = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || routes.ROOT;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated[0]) {
      navigate(routes.ROOT);
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(Actions.createAction(Actions.USER_LOGIN, { name: "karan" }));
  }, []);

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
      role:"teacher"
    },
    {
      title: t("Role.student"),
      description: t("SignUp.joinAsStudentDescription"),
      icon: <JoinAsStudentIcon />,
      role:"student"
    },
    {
      title: t("Role.parent"),
      description: t("SignUp.joinAsParentDescription"),
      icon: <JoinAsParentIcon />,
      role:"parent"
    },
  ];
  /* Select role data dependency */
  
  /* Role tabs component */
  const selectRoleTabs = () => {
    const handleSelectRole = (role:string) => {
      console.log(role,'role')
      navigate(`/auth/sign-up/select-role/${role}`)
    }
    return (
      <>
        <div className="RoleWrapper">
          {roleData?.map((_data) => {
            return (
              <Card className="RoleCard" onClick={()=>handleSelectRole(_data.role)}>
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
