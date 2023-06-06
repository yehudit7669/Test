import { Button, TextField } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"



function ForgotPassword() {
  const {t} = useTranslation()
  return (
    <>
    <div className="ForgotPassword">
      <div className="Wrapper">
        <div className="Title">{t("ForgotPassword.forgotPassword")}</div>
        <div className="Title">{t("ForgotPassword.noWorries")}</div>
        <label className="Subtitle" data-subtitle>
          {t("ForgotPassword.submitYourEmail")}
        </label>
        <form className="ForgotPasswordForm">
          <TextField label="Email" variant="outlined" fullWidth />
          <Button className="Button" variant="contained" fullWidth color="secondary">
            {t("ForgotPassword.send")}
          </Button>
        </form>
        <div className="BackToLoginLinkContainer">
          <label>{t("ForgotPassword.backTo")}</label>
          <Link className="BackToLoginLink" to="/auth/sign-in">
            {t("ForgotPassword.login")}
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default ForgotPassword