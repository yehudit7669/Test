import { Link } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import { useEffect } from "react";
import Actions from "../../../actions";
import { getUser } from "../../../services/auth/authServices";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import {
  GoogleIcon,
  MicrosoftIcon,
} from "../../../assets/svgs/svg-components.tsx";

function SignIn() {
  const { t } = useTranslation();
  const user = useAppSelector((state: any) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Actions.createAction(Actions.USER_LOGIN, { name: "karan" }));
  }, []);

  // const handleSignIn = () => {
  //   dispatch(getUser("email", "password", true));
  // };
  console.log(user);
  return (
    <div className="SignIn">
      <div className="Navigation">
        {t("SignIn.newToWizer")} <Link to="sign-up">{t("SignIn.signUp")}</Link>
      </div>
      <div className="Wrapper">
        <div className="Title">{t("SignIn.logInToWizer")}</div>
        <label className="Subtitle" data-subtitle>
          {t("SignIn.discoverWizer")}
        </label>
        <Button
          className="Button"
          variant="contained"
          fullWidth
          color="inherit"
          data-auth
        >
          <div className="IconContainer">
            <GoogleIcon />
          </div>{" "}
          {t("SignIn.connect.google")}
        </Button>
        <Button
          className="Button"
          variant="contained"
          fullWidth
          color="inherit"
          data-auth
        >
          <div className="IconContainer">
            <MicrosoftIcon />
          </div>{" "}
          {t("SignIn.connect.microsoft")}
        </Button>
        <div className="Subtitle">{t("SignIn.orText")}</div>
        <form className="SignInForm">
          <TextField label="Email" variant="outlined" fullWidth />
          <TextField label="Password" variant="outlined" fullWidth />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
          <Button className="Button" variant="contained" fullWidth color="secondary">
            {t("SignIn.signIn")}
          </Button>
        </form>
        <Link className="ForgotPasswordLink" to="/auth/forgot-password">
          {t("SignIn.forgotPassword")}
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
