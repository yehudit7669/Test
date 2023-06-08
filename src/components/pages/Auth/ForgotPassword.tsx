import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordAction } from "../../../services/auth/authServices";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { routes } from "../../../constants";

function ForgotPassword() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = (e: any) => {
    e.preventDefault();
    let validInputs = true;
    if (!email) {
      validInputs = false;
      setError("Please enter email address");
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
      dispatch(forgotPasswordAction(email))
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            setSuccessMessage(response.data.message);
            setTimeout(() => {
              navigate(routes.SIGN_IN);
            }, 3000);
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

  const renderSuccess = () => {
    if (successMessage)
      return (
        <Typography
          align="center"
          variant="body1"
          component="span"
          color={"green"}
        >
          {successMessage}
        </Typography>
      );
  };
  const renderError = () => {
    if (error)
      return (
        <Typography
          align="center"
          variant="body1"
          component="span"
          color={"red"}
        >
          {error}
        </Typography>
      );
  };

  return (
    <>
      <div className="ForgotPassword">
        <div className="Wrapper">
          <div className="Title">{t("ForgotPassword.forgotPassword")}</div>
          <div className="Title">{t("ForgotPassword.noWorries")}</div>
          <label className="Subtitle" data-subtitle>
            {t("ForgotPassword.submitYourEmail")}
          </label>
          <form
            className="ForgotPasswordForm"
            onSubmit={(e) => handleForgotPassword(e)}
          >
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
              fullWidth
            />

            <Button
              className="Button"
              variant="contained"
              fullWidth
              color="secondary"
            >
              {t("ForgotPassword.send")}
            </Button>
            {renderSuccess()}
            {renderError()}
          </form>
          <div className="BackToLoginLinkContainer">
            <label>{t("ForgotPassword.backTo")}</label>
            <Link className="BackToLoginLink" to={"/" + routes.SIGN_IN}>
              {t("ForgotPassword.login")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
