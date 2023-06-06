import { Link } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import { useEffect, useState } from "react";
import Actions from "../../../actions/index.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks.ts";
import {
  GoogleIcon,
  MicrosoftIcon,
} from "../../../assets/svgs/svg-components.tsx";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function BirthDateComponent() {
  const { t } = useTranslation();
  const user = useAppSelector((state: any) => state.auth.user);
  const dispatch = useAppDispatch();

  const [birthDateValue, setBirthDateValue] = useState()

  useEffect(() => {
    dispatch(Actions.createAction(Actions.USER_LOGIN, { name: "karan" }));
  }, []);

  return (
    <div className="BirthDate">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="Wrapper">
          <label className="Title">{t("BirthDate.birthDate")}</label>
          <form className="BirthDateForm">
            <div className="DatePickerContainer">
              <div className="DateContainer">
                <label className="DatePickerLabel">{t("BirthDate.dayTitle")}</label>
                <DatePicker
                  className="DatePicker"
                  format="DD"
                  views={['day']}
                  defaultValue={null}
                  value={birthDateValue}
                  onChange={(value:any)=>setBirthDateValue(value)}
                  />
              </div>
              <div className="DateContainer">
                <label className="DatePickerLabel">{t("BirthDate.monthTitle")}</label>
                <DatePicker
                  className="DatePicker"
                  format="MM"
                  views={['month']}
                  value={birthDateValue}
                  onChange={(value:any)=>setBirthDateValue(value)}
                  />
              </div>

              <div className="DateContainer">
                <label className="DatePickerLabel">{t("BirthDate.yearTitle")}</label>
                <DatePicker
                  className="DatePicker"
                  format="YYYY"
                  views={['year']}
                  value={birthDateValue}
                  onChange={(value:any)=>setBirthDateValue(value)}
                  />
              </div>
            </div>
            <Button
              className="Button"
              variant="contained"
              fullWidth
              color="secondary"
              >
              {t("BirthDate.submit")}
            </Button>
          </form>
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default BirthDateComponent;
