import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import { useState } from "react";
import Actions from "../../../actions";
import { getUserAction } from "../../../services/auth/authServices";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import {
  GoogleIcon,
  MicrosoftIcon,
} from "../../../assets/svgs/svg-components.tsx";
import useLocalStorage from "../../../hooks/useLocalStorage.tsx";
import { routes } from "../../../constants/routeConsts.tsx";

import SingleLineColorText from "../../common/errorText/SingleLineColorText.tsx";
import { loginValidations } from "../../../validations/authValidations.tsx";

function SignIn() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [, setToken] = useLocalStorage();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const renderSignUpButton = () => (
    <div className="Navigation">
      {t("SignIn.newToWizer")}{" "}
      <Link to={`/${routes.SIGN_UP}`}>{t("SignIn.signUp")}</Link>
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
      <form className="SignInForm" onSubmit={(e) => handleSignIn(e)}>
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
          type="submit"
        >
          {t("SignIn.signIn")}
        </Button>
      </form>
    );
  };
  const renderForgotPassword = () => (
    <Link className="ForgotPasswordLink" to={`/${routes.FORGOT_PASSWORD}`}>
      {t("SignIn.forgotPassword")}
    </Link>
  );

  const handleSignIn = (e: any) => {
    e.preventDefault();
    let validate = loginValidations(email, password);
    if (validate.status) {
      setError(validate.message);
    } else {
      setError("");
      //TODO : ADD api call code
      dispatch(getUserAction(email, password, rememberMe))
        .then((response: any) => {
          console.log("response", response);
          if (response.status === 200) {
            const { token, role } = response.data;
            setToken(token);
            dispatch(Actions.createAction(Actions.SET_USER_ROLE, role));
            // Navigate based on role
            navigate(`/${role}`, { replace: true });
          } else {
            setError(response.response.data.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setError(error.message);
        });
    }
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
        <SingleLineColorText
          text={error}
          variant={"body1"}
          component={"span"}
          color="red"
          align="center"
        />
        {renderForgotPassword()}
      </div>
    </div>
  );
}

export default SignIn;
