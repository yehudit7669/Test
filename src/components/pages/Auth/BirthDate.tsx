import { Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Auth.css";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { getFirstLoginStudentAction } from "../../../services/firstLoginStudent/firstLoginStudentServices";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { CalendarIcon } from "../../../assets/svgs/svg-components";

function BirthDate() {
  const { t } = useTranslation();

  /* Routing, navigation and param dependencies */
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  /* Routing, navigation and param dependencies */

  /* Form submission, loading and display error dependencies */
  const [birthDateValue, setBirthDateValue] = useState<Dayjs | null>();
  const [formattedDateValue, setFormattedDateValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  /* Form submission, loading and display error dependencies */

  /* Function definition for on change event of date picker */
  const handleChangeBirthDate =  (value:Dayjs) => {
    setBirthDateValue(value)
    const formattedDate = dayjs(value).format("DD/MM/YYYY")
    setFormattedDateValue(formattedDate)
  }
  /* Function definition for on change event of date picker */

  /* On submit form */
  const handleSubmitFirstLoginStudentForm = (e:React.FormEvent) => {
    e.preventDefault()
    // Calling signup api , setting user toke, navigating to dashboard and setting error
    const DOB = formattedDateValue;
    dispatch(
      getFirstLoginStudentAction(
        DOB,
        navigate,
        setError,
        setLoading
        )
        );
      }
  /* On submit form */

  return (
    <div className="BirthDate">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="Wrapper">
          <label className="Title">{t("BirthDate.birthDate")}</label>
          <form className="BirthDateForm" onSubmit={(e)=>handleSubmitFirstLoginStudentForm(e)}>
            <div className="DatePickerContainer">
              <div className="DateContainer">
                <label className="DatePickerLabel">
                  {t("BirthDate.dayTitle")}
                </label>
                <DatePicker
                  slots={{
                    openPickerIcon:CalendarIcon
                  }}
                  className="DatePicker"
                  format="DD"
                  views={["day"]}
                  defaultValue={null}
                  value={birthDateValue}
                  onChange={(value: any) => handleChangeBirthDate(value)}
                />
              </div>
              <div className="DateContainer">
                <label className="DatePickerLabel">
                  {t("BirthDate.monthTitle")}
                </label>
                <DatePicker
                  slots={{
                    openPickerIcon:CalendarIcon
                  }}
                  className="DatePicker"
                  format="MM"
                  views={["month"]}
                  value={birthDateValue}
                  onChange={(value: any) => handleChangeBirthDate(value)}
                />
              </div>

              <div className="DateContainer">
                <label className="DatePickerLabel">
                  {t("BirthDate.yearTitle")}
                </label>
                <DatePicker
                  slots={{
                    openPickerIcon:CalendarIcon
                  }}
                  className="DatePicker"
                  format="YYYY"
                  views={["year"]}
                  value={birthDateValue}
                  onChange={(value: any) => handleChangeBirthDate(value)}
                />
              </div>
            </div>
            <Button
              className="Button"
              variant="contained"
              fullWidth
              color="secondary"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress /> : t("BirthDate.submit")}
            </Button>
          </form>
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default BirthDate;
