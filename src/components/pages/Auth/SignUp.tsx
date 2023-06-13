import { Link, useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import { useEffect, useState } from "react";

import {
  GoogleIcon,
  MicrosoftIcon,
} from "../../../assets/svgs/svg-components.tsx";

import { routes } from "../../../constants/routeConsts.tsx";
import userRoles from "../../../constants/userRolesConsts.tsx";
import { signUpValidations } from "../../../validations/authValidations.tsx";
import SingleLineColorText from "../../common/errorText/SingleLineColorText.tsx";
import { getSignUpAction } from "../../../services/signup/signupServices.tsx";
import useLocalStorage from "../../../hooks/useLocalStorage.tsx";
import { useAppDispatch } from "../../../hooks/redux-hooks.ts";

function JoinWizerSignUpPage() {
  const { t } = useTranslation();

  /* Routing, navigation and param dependencies */
  const navigate = useNavigate();
  const params = useParams();
  const [, setToken] = useLocalStorage();
  const dispatch = useAppDispatch();
  /* Routing, navigation and param dependencies */

  /* Form submission dependencies */
  const [formDetails, setFormDetails] = useState({
    email:"",
    password:"",
    classCode:""
  })
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const { role } = params;
  /* Form submission dependencies */
  

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
      {t("JoinWizerSignUp.title")} {t(`Role.${role}`)}
    </Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("JoinWizerSignUp.notA")} {t(`Role.${role}`)}?
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

    /* On change dependencies for form details */
    const handleInputChange = (event:React.SyntheticEvent) => {
      setFormDetails((prevValue)=>{
        return {
          ...prevValue,
          [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value
        }
      })  
    /* On change dependencies for form details */
    }

    /* Function definition for Sign Up */
    const handleSignUp = (e: React.FormEvent) => {
      e.preventDefault();
      const {email, password, classCode} = formDetails;
      const validate = signUpValidations(email, password, classCode);
      // Check validation
      if (validate.status) {
        setError(validate.message);
      } else {
        setError("");
        // Calling signup api , setting user toke, navigating to dashboard and setting error
        dispatch(
          getSignUpAction(
            email,
            password,
            classCode,
            role,
            setToken,
            navigate,
            setError,
            setLoading
          )
        );
      }
    };
    /* Function definition for Sign Up */

    return (
      <>
        <form className="JoinWizerSignUpForm" onSubmit={(e)=>handleSignUp(e)}>
          <TextField
            onChange={(e) =>  handleInputChange(e)}
            type="email"
            value={formDetails.email}
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
          />
          <TextField
            onChange={(e) => handleInputChange(e)}
            type="password"
            value={formDetails.password}
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
          />
          {role === userRoles.STUDENT && (
            <TextField
              onChange={(e) => handleInputChange(e)
              }
              value={formDetails.classCode}
              placeholder="Enter class code (optional)"
              label="Class code"
              variant="outlined"
              fullWidth
              name="classCode"
            />
          )}
          <Button
            className="Button"
            variant="contained"
            fullWidth
            color="secondary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress /> : t("JoinWizerSignUp.signUp")}
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

  return (
    <div className="SignIn">
      {renderLogInButton()}
      <div className="Wrapper">
        {renderTitle()}
        {renderSubTitle()}
        {renderSocialSignUp()}
        <div className="Subtitle">{t("SignIn.orText")}</div>
        {renderJoinWizerSignUpForm()}
        <SingleLineColorText
          text={error}
          variant={"body1"}
          component={"span"}
          color="red"
          align="center"
        />
        {renderTermsAndPolicy()}
      </div>
    </div>
  );
}

export default JoinWizerSignUpPage;
