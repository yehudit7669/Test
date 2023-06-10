import { Autocomplete, Grid, TextField, Typography, Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";
import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";

const StudentsGradeStepperFour = () => {
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
    gradeTags: [],
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
      {t("FirstLoginTeacher.stepFour.title")}
    </Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("FirstLoginTeacher.stepFour.subTitle")}
    </Typography>
  );

  const renderGradeTags = () => {
    return (
      <>
        <Stack direction="row" gap={1} flexWrap="wrap">
          <Chip
            variant="outlined"
            size="medium"
            sx={{ height: "40px" }}
            label="Premade worksheets"
          />
          <Chip
            variant="outlined"
            size="medium"
            sx={{ height: "40px" }}
            label="To digitize pdf worksheet"
          />
          <Chip
            variant="outlined"
            size="medium"
            sx={{ height: "40px" }}
            label="Easy way to differentiate assignments"
          />
          <Chip
            variant="outlined"
            size="medium"
            sx={{ height: "40px" }}
            label="Create fun worksheets for my students"
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
              <FormLabel className="FormLabel">{t("FirstLoginTeacher.stepFour.otherReason")}?</FormLabel>
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
      {renderGradeTags()}
      {renderFirstLoginTeacherForm()}
    </>
  );
};

export default StudentsGradeStepperFour;
