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
    <Typography className="Title">{t("SignIn.logInToWizer")}</Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("SignIn.discoverWizer")}
    </Typography>
  );

  const roleData = [
    {
      title: t("SignUp.joinAsTeacher"),
      description: t("SignUp.joinAsTeacherDescription"),
      icon: <JoinAsTeacherIcon />,
    },
    {
      title: t("SignUp.joinAsStudent"),
      description: t("SignUp.joinAsStudentDescription"),
      icon: <JoinAsStudentIcon />,
    },
    {
      title: t("SignUp.joinAsParent"),
      description: t("SignUp.joinAsParentDescription"),
      icon: <JoinAsParentIcon />,
    },
  ];

  const handleSelectRole = () => {
    return (
      <>
        <div className="RoleWrapper">
          {roleData?.map((_data) => {
            return (
              <Card className="RoleCard">
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

  return (
    <div className="SignUp">
      <div className="Wrapper">
        {renderTitle()}
        {renderSubTitle()}
        {handleSelectRole()}
      </div>
    </div>
  );
}

export default SignIn;
