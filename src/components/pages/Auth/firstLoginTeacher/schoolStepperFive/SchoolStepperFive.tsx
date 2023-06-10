import {
  Autocomplete,
  Grid,
  TextField,
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";
import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import { Link } from "react-router-dom";

const SchoolStepperFive = () => {
  /* i18n translation dependencies */
  const { t } = useTranslation();
  /* i18n translation dependencies */

  /* Routing, navigation and param dependencies */
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  /* Routing, navigation and param dependencies */

  /* Form submission dependencies */
  const [formData, setFormData] = useState({
    school_id: "",
  });
  /* Form submission dependencies */

  /* OnChange dependencies */
  const handleChangeFormData = (e: React.SyntheticEvent) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      };
    });
  };
  /* OnChange dependencies */

  /* Stepper Three component dependencies */
  const renderTitle = () => (
    <Typography className="Title">
      {" "}
      {t("FirstLoginTeacher.stepFive.title")}
    </Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("FirstLoginTeacher.stepFive.subTitle")}
    </Typography>
  );

  const renderFirstLoginTeacherForm = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={6} md={12}>
            <FormLabel className="FormLabel">
              {t("FirstLoginTeacher.stepFive.searchSchool")}
            </FormLabel>
            <TextField
              className="GenericFormFieldMargin"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <div className="SchoolsContainer">
            <div className="SchoolElement">
              <div className="RadioButtonContainer">
                <FormControlLabel label="" className="RadioButton" value="female" control={<Radio />} />
              </div>
              <div className="SchoolDataContainer">
                  <Typography>
                    School 1
                  </Typography>
                  <Typography>
                    5656 S 129th E Ave, Tulsa, OK 74134, United States
                  </Typography>
              </div>
              <div className="NoOfTeachersContainer">
              <Typography>6 teachers</Typography>
              </div>
            </div>
            <div className="SchoolElement">
              <div className="RadioButtonContainer">
                <FormControlLabel label="" className="RadioButton" value="female" control={<Radio />} />
              </div>
              <div className="SchoolDataContainer">
                  <Typography>
                    School 2
                  </Typography>
                  <Typography>
                    5656 S 129th E Ave, Tulsa, OK 74134, United States
                  </Typography>
              </div>
              <div className="NoOfTeachersContainer">
              <Typography>6 teachers</Typography>
              </div>
            </div>
            <div className="SchoolElement">
              <div className="RadioButtonContainer">
                <FormControlLabel label="" className="RadioButton" value="female" control={<Radio />} />
              </div>
              <div className="SchoolDataContainer">
                  <Typography>
                    School 3
                  </Typography>
                  <Typography>
                    5656 S 129th E Ave, Tulsa, OK 74134, United States
                  </Typography>
              </div>
              <div className="NoOfTeachersContainer">
              <Typography>6 teachers</Typography>
              </div>
            </div>
            <div className="SchoolElement">
              <div className="RadioButtonContainer">
                <FormControlLabel label="" className="RadioButton" value="female" control={<Radio />} />
              </div>
              <div className="SchoolDataContainer">
                  <Typography>
                    School 4
                  </Typography>
                  <Typography>
                    5656 S 129th E Ave, Tulsa, OK 74134, United States
                  </Typography>
              </div>
              <div className="NoOfTeachersContainer">
              <Typography>6 teachers</Typography>
              </div>
            </div>
          </div>
          <Grid item xs={4} sm={6} md={12}>
            <Link to="#" className="DidntSeeYourSchoolLink">
              {t("FirstLoginTeacher.stepFive.noSchoolLink")}
            </Link>
          </Grid>
        </Grid>
      </>
    );
  };
  /* Stepper Three component dependencies */

  return (
    <>
      {renderTitle()}
      {renderFirstLoginTeacherForm()}
    </>
  );
};

export default SchoolStepperFive;
