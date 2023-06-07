import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  useFormControl,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import React, { useEffect, useState } from "react";
import Actions from "../../../actions";
import { getUser } from "../../../services/auth/authServices";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import {
  GoogleIcon,
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
    dispatch(Actions.createAction(Actions.USER_LOGIN, { name: "karan" }));
  }, []);

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
      <>
        <form className="SignInForm">
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            label="Email"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            label="Password"
            variant="outlined"
            fullWidth
            required
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

  const handleSignIn = () => {
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
      // dispatch(getUser("email", "password", true))
      //   .then((response) => {
      //     if (response.status === 200) {
      //       const { token } = response.data;
      //       setToken(token);
      //       setUser(response.data);
      //Navigate based on role and first sign in
      //       navigate(routes.ROOT);
      //     }
      //   })
      //   .catch((error) => {
      //     setError(error.response.data.message);
      //   });

      const response = {
        name: "Karan Mishra",
        hasSignedInBefore: true,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoic3R1ZGVudCIsImhhc1NpZ25lZEluQmVmb3JlIjp0cnVlfQ.1DhPob3HaXa22UEWn6Wn5aSBt8KuCwJdJa169b_J7tM",
        role: "student",
      };
      setToken(response.token);
      dispatch(Actions.createAction(Actions.SET_USER_ROLE, response.role));
      navigate("/" + response.role, { replace: true });
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
