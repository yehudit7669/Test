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
import { getUser } from "../../../services/auth/authServices";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import {
  GoogleIcon,
  MicrosoftIcon,
} from "../../../assets/svgs/svg-components.tsx";
import useLocalStorage from "../../../hooks/useLocalStorage.tsx";
import useUser from "../../../hooks/useUser.tsx";
import { routes } from "../../../constants/routeConsts.tsx";

function JoinWizerSignUpPage() {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.auth.user);
  const [, setToken] = useLocalStorage();
  const isAuthenticated = useUser();

  /* Routing and navigation dependencies */
  const navigate = useNavigate();
  const location = useLocation();
  /* Routing and navigation dependencies */
  const from = location?.state?.from?.pathname || routes.ROOT;
  
  /* Form submission dependencies */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  /* Form submission dependencies */

  useEffect(() => {
    if (isAuthenticated[0]) {
      navigate(routes.ROOT);
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(Actions.createAction(Actions.USER_LOGIN, { name: "karan" }));
  }, []);

  const renderLogInButton = () => (
    <div className="Navigation">
      {t("JoinWizerSignUp.haveAccount")} <Link to="/auth/sign-in">{t("JoinWizerSignUp.signIn")}</Link>
    </div>
  );
  const renderTitle = () => (
    <Typography className="Title">{t("JoinWizerSignUp.joinWizerAsParent")}</Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("SignIn.discoverWizer")} <Link to="/auth/sign-up">{t("JoinWizerSignUp.change")}</Link>
    </Typography> 
  );
  const renderSocialSignUp = () => {
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
        <form className="JoinWizerSignUpForm">
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
          <Button
            className="Button"
            variant="contained"
            fullWidth
            color="secondary"
            onClick={() => handleSignIn()}
          >
            {t("JoinWizerSignUp.signUp")}
          </Button>
        </form>
      </>
    );
  };
  const renderTermsAndPolicy = () => (
    <>
    <Typography>
    {t("JoinWizerSignUp.TermsAndPolicy")}  
    </Typography>
    <Link className="TermsAndPolicyLink" to="#">
      {t("JoinWizerSignUp.TermsOfService")}
    </Link>
    <Link className="TermsAndPolicyLink" to="#">
      {t("JoinWizerSignUp.PrivacyPolicy")}
    </Link>
    </>
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
      dispatch(getUser("email", "password", true))
        .then(async(response) => {
          if (response.status === 200) {
            console.log(response.data,'response.data.token')
            const { token, isBirthDate } = response.data;
            setToken(token);
            // Navigate based on role and first sign in
            if(!isBirthDate){
              navigate(routes.AUTH + "/" + routes.BIRTH_DATE);
            }
          }
        })
        .catch((error) => {
          setError(error.response.data.message);
        });

      //Temp solution
      let jwt =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoic3R1ZGVudCIsImhhc1NpZ25lZEluQmVmb3JlIjp0cnVlfQ.1DhPob3HaXa22UEWn6Wn5aSBt8KuCwJdJa169b_J7tM";
      setToken(jwt);
      navigate(from, { replace: true });
      console.log("Log in successful");
    }
  };

  return (
    <div className="JoinWizerSignUpPage">
      {renderLogInButton()}
      <div className="Wrapper">
        {renderTitle()}
        {renderSubTitle()}
        {renderSocialSignUp()}
        <div className="Subtitle">{t("SignIn.orText")}</div>
        {renderSignInForm()}
        {renderError()}
        {renderTermsAndPolicy()}
      </div>
    </div>
  );
}

export default JoinWizerSignUpPage;
