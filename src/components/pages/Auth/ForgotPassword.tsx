import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordAction } from "../../../services/auth/authServices";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { routes } from "../../../constants";
import SingleLineColorText from "../../common/errorText/SingleLineColorText";
import { forgotPasswordValidations } from "../../../validations/authValidations";

function ForgotPassword() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    let validate = forgotPasswordValidations(email);
    if (validate.status) {
      setError(validate.message);
    } else {
      setError("");
      // Calling forgot password api, setting error/success message, navigating to sign in and showing loader
      dispatch(
        forgotPasswordAction(
          email,
          setSuccessMessage,
          setError,
          navigate,
          setLoader
        )
      );
    }
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
              type="submit"
              disabled={loader}
            >
              {loader ? <CircularProgress /> : t("ForgotPassword.send")}
            </Button>
            <SingleLineColorText
              text={successMessage}
              variant={"body1"}
              component={"span"}
              color="green"
              align="center"
            />
            <SingleLineColorText
              text={error}
              variant={"body1"}
              component={"span"}
              color="red"
              align="center"
            />
          </form>
          <div className="BackToLoginLinkContainer">
            <label>{t("ForgotPassword.backTo")}</label>
            <Link className="BackToLoginLink" to={`/${routes.SIGN_IN}`}>
              {t("ForgotPassword.login")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
