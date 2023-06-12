import { Grid, TextField, Typography, Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";

const AboutYourRoleStepperTwo = () => {
  /* i18n translation dependencies */
  const { t } = useTranslation();

  /* Form submission dependencies */
  const [formData, setFormData] = useState({
    other: "",
    supportChildEducationTags: [],
  });
  /* Form submission dependencies */

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
        <Stack direction="row" gap={1} flexWrap="wrap">
          <Chip
            variant="outlined"
            size="medium"
            label="Elementary"
          />
          <Chip
            variant="outlined"
            size="medium"
            label="Middle School"
          />
          <Chip
            variant="outlined"
            size="medium"
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
