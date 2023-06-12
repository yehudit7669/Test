import { Link, useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import { useEffect, useState } from "react";

import {
  GoogleIcon,
  MicrosoftIcon,
} from "../../../assets/svgs/svg-components.tsx";

import { routes } from "../../../constants/routeConsts.tsx";
import userRoles from "../../../constants/userRolesConsts.tsx";

function JoinWizerSignUpPage() {
  const { t } = useTranslation();

  /* Routing, navigation and param dependencies */
  const navigate = useNavigate();
  const params = useParams();
  /* Routing, navigation and param dependencies */

  /* Form submission dependencies */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classCode, setClassCode] = useState("");
  // const [error, setError] = useState("");
  const [signUpRole, setSignUpRole] = useState<string | undefined>("");
  const { role } = params;
  /* Form submission dependencies */

  useEffect(() => {
    setSignUpRole(role);
  }, [navigate, role]);

  const renderLogInButton = () => (
    <div className="Navigation">
      {t("JoinWizerSignUp.haveAccount")}{" "}
      <Link to={`/${routes.SIGN_IN}`} className="ChangeLink">
        {t("JoinWizerSignUp.signIn")}
      </Link>
    </div>
  );
  const renderTitle = () => (
    <Typography className="Title">
      {t("JoinWizerSignUp.title")} {t(`Role.${signUpRole}`)}
    </Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("JoinWizerSignUp.notA")} {t(`Role.${signUpRole}`)}?
      <Link to={`/${routes.SIGN_UP}`} className="ChangeLink">
        {t("JoinWizerSignUp.change")}
      </Link>
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
          </div>
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
          </div>
          {t("SignIn.connect.microsoft")}
        </Button>
      </>
    );
  };
  const renderJoinWizerSignUpForm = () => {
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
          {signUpRole === userRoles.STUDENT && (
            <TextField
              onChange={(e) => setClassCode(e.target.value)}
              value={classCode}
              placeholder="Enter class code (optional)"
              label="Class code"
              variant="outlined"
              fullWidth
            />
          )}
          <Button
            className="Button"
            variant="contained"
            fullWidth
            color="secondary"
          >
            {t("JoinWizerSignUp.signUp")}
          </Button>
        </form>
      </>
    );
  };
  const renderTermsAndPolicy = () => (
    <div className="TermsAndPolicyWrapper">
      <span>{t("JoinWizerSignUp.termsAndPolicyDescription")}</span>
      <Link className="TermsAndPolicyLink" to="#">
        {t("JoinWizerSignUp.termsOfService")}
      </Link>
      <span> & </span>
      <Link className="TermsAndPolicyLink" to="#">
        {t("JoinWizerSignUp.privacyPolicy")}
      </Link>
      <span>.</span>
    </div>
  );
  // const renderError = () => {
  //   if (error)
  //     return (
  //       <Typography variant="body1" component="span" color={"red"}>
  //         {error}
  //       </Typography>
  //     );
  // };

  return (
    <div className="SignIn">
      {renderLogInButton()}
      <div className="Wrapper">
        {renderTitle()}
        {renderSubTitle()}
        {renderSocialSignUp()}
        <div className="Subtitle">{t("SignIn.orText")}</div>
        {renderJoinWizerSignUpForm()}
        {/* {renderError()} */}
        {renderTermsAndPolicy()}
      </div>
    </div>
  );
}

export default JoinWizerSignUpPage;
