import { Grid, TextField, Typography, Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";

const StepperFour = () => {
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
      {t("FirstLoginParent.stepFour.title")}
    </Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("FirstLoginParent.stepFour.subTitle")}
    </Typography>
  );

  const renderSupportChildEducationTags = () => {
    return (
      <>
        <Stack direction="row" spacing={1} gap={1} flexWrap="wrap">
          <Chip
            variant="outlined"
            size="medium"
            sx={{ height: "40px" }}
            label="Keep up on my child class activity"
          />
          <Chip
            variant="outlined"
            size="medium"
            sx={{ height: "40px" }}
            label="To advance  my child beyond class program"
          />
        </Stack>
      </>
    );
  };

  const renderFirstLoginParentForm = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={6} md={12}>
            <FormLabel className="FormLabel">Other</FormLabel>
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
      {renderFirstLoginParentForm()}
    </>
  );
};

export default StepperFour;
