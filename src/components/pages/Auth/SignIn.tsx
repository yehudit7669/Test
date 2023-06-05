import { Link } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import { useEffect, useState } from "react";
import Actions from "../../../actions";
import { getUser } from "../../../services/auth/authServices";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import {
  GoogleIcon,
  MicrosoftIcon,
} from "../../../assets/svgs/svg-components.tsx";

function SignIn() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.auth.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    dispatch(Actions.createAction(Actions.USER_LOGIN, { name: "karan" }));
  }, []);

  const renderSignUpButton = () => (
    <div className="Navigation">
      {t("SignIn.newToWizer")} <Link to="sign-up">{t("SignIn.signUp")}</Link>
    </div>
  );
  const renderTitle = () => (
    <div className="Title">{t("SignIn.logInToWizer")}</div>
  );
  const renderSubTitle = () => (
    <label className="Subtitle" data-subtitle>
      {t("SignIn.discoverWizer")}
    </label>
  );
  const renderSocialSignIn = () => {
    return (
      <>
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
      </>
    );
  };
  const renderSignInForm = () => {
    return (
      <>
        <form className="SignInForm">
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            label="Email"
            variant="outlined"
            fullWidth
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            label="Password"
            variant="outlined"
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                value={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                defaultChecked
              />
            }
            label="Remember Me"
          />
          <Button
            className="Button"
            variant="contained"
            fullWidth
            color="secondary"
            onClick={() => handleSignIn()}
          >
            {t("SignIn.signIn")}
          </Button>
        </form>
      </>
    );
  };
  const renderForgotPassword = () => (
    <Link className="ForgotPassword" to="forgot-password">
      {t("SignIn.forgotPassword")}
    </Link>
  );

  const validateSignIn = () => {
    let error: any = {};
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      error.email = "Please enter email and password";
    }
    if (!password) {
      error.password = "Please enter password";
    }
    if (!email.toLowerCase().match(emailRegex)) {
      error.email = "Please enter a valid email";
    }
    console.log(error);
    return error;
  };

  const handleSignIn = () => {
    validateSignIn();
    // dispatch(getUser("email", "password", true));
  };

  return (
    <div className="SignIn">
      {renderSignUpButton()}
      <div className="Wrapper">
        {renderTitle()}
        {renderSubTitle()}
        {renderSocialSignIn()}
        <div className="Subtitle">{t("SignIn.orText")}</div>
        {renderSignInForm()}
        {renderForgotPassword()}
      </div>
    </div>
  );
}

export default SignIn;
