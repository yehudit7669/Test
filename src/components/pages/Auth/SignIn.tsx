import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import { useEffect, useState } from "react";
import Actions from "../../../actions";
import { getUserAction } from "../../../services/auth/authServices";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import {
  GoogleIcon,
  MicrosoftIcon,
} from "../../../assets/svgs/svg-components.tsx";
import useLocalStorage from "../../../hooks/useLocalStorage.tsx";
import { routes } from "../../../constants/routeConsts.tsx";

function SignIn() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [, setToken] = useLocalStorage();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || routes.ROOT;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const renderSignUpButton = () => (
    <div className="Navigation">
      {t("SignIn.newToWizer")}{" "}
      <Link to={routes.AUTH + "/" + routes.SIGN_UP}>{t("SignIn.signUp")}</Link>
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
    <Link className="ForgotPasswordLink" to="/auth/forgot-password">
      {t("SignIn.forgotPassword")}
    </Link>
  );

  const renderError = () => {
    if (error)
      return (
        <Typography variant="body1" component="span" color={"red"}>
          {error}
        </Typography>
      );
  };

  const handleSignIn = (e: any) => {
    e.preventDefault();
    let validInputs = true;
    if (!email || !password) {
      validInputs = false;
      setError("Please fill all details.");
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      validInputs = false;
      setError("Please enter valid email address.");
    } else {
      validInputs = true;
      setError("");
    }
    if (validInputs) {
      //TODO : ADD api call code
      dispatch(getUserAction(email, password, rememberMe))
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            const { token, role } = response.data;
            setToken(token);
            dispatch(Actions.createAction(Actions.SET_USER_ROLE, role));
            // Navigate based on role
            navigate("/" + role, { replace: true });
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
        {renderError()}
        {renderForgotPassword()}
      </div>
    </div>
  );
}

export default SignIn;
