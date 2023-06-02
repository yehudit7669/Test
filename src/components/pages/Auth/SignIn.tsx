import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import { useEffect } from "react";
import Actions from "../../../actions";
import { getUser } from "../../../services/auth/authServices";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";

function SignIn() {
  const { t } = useTranslation();
  const user = useAppSelector((state: any) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Actions.createAction(Actions.USER_LOGIN, { name: "karan" }));
  }, []);

  const handleSignIn = () => {
    dispatch(getUser("email", "password", true));
  };
  console.log(user);
  return (
    <div className="SignIn">
      <div className="Navigation">
        {t("SignIn.newToWizer")} <Link to="sign-up">{t("SignIn.signUp")}</Link>
      </div>
      <div className="Wrapper">
        <div className="Title">
          {user.name}
          {t("SignIn.signInToWizer")}
        </div>
        <div className="Subtitle">{t("SignIn.discoverWizer")}</div>
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Password" variant="outlined" fullWidth />
        <Button variant="contained" fullWidth>
          {t("SignIn.signIn")}
        </Button>
        <Link className="ForgotPassword" to="forgot-password">
          {t("SignIn.forgotPassword")}
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
