import {
  Autocomplete,
  Grid,
  TextField,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";
import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";

const AboutYourRoleStepperTwo = () => {
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
    other: "",
    supportChildEducationTags: [],
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
      {t("FirstLoginTeacher.stepTwo.title")}
    </Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("FirstLoginTeacher.stepTwo.subTitle")}
    </Typography>
  );

  const renderSupportChildEducationTags = () => {
    return (
      <>
        <Stack direction="row" spacing={1}>
          <Chip
            variant="outlined"
            size="medium"
            sx={{ height: "40px" }}
            label="Elementary"
          />
          <Chip
            variant="outlined"
            size="medium"
            sx={{ height: "40px" }}
            label="Middle School"
          />
          <Chip
            variant="outlined"
            size="medium"
            sx={{ height: "40px" }}
            label="Principal"
          />
        </Stack>
      </>
    );
  };

  const renderFirstLoginTeacherForm = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={6} md={12}>
            <FormLabel className="FormLabel">
              {t("FirstLoginTeacher.stepTwo.otherRole")}
            </FormLabel>
            <TextField
              className="GenericFormFieldMargin"
              onChange={(e: React.SyntheticEvent) =>
                setFormData((prevValue) => {
                  return {
                    ...prevValue,
                    other: (e.target as HTMLInputElement).value,
                  };
                })
              }
              value={formData.other}
              label="Type here (seperate by comma)"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </>
    );
  };
  /* Stepper Three component dependencies */

  return (
    <>
      {renderTitle()}
      {renderSubTitle()}
      {renderSupportChildEducationTags()}
      {renderFirstLoginTeacherForm()}
    </>
  );
};

export default AboutYourRoleStepperTwo;
