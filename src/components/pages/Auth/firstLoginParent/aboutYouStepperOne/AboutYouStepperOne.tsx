import {
  Autocomplete,
  Grid,
  TextField,
  Typography,
  FormLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

const StepperOne = () => {
  /* i18n translation dependencies */
  const { t } = useTranslation();

  /* Routing, navigation and param dependencies */

  /* Form submission dependencies */
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  /* Stepper One component dependencies */
  const renderTitle = () => (
    <Typography className="Title">
      {" "}
      {t("FirstLoginParent.stepOne.title")}
    </Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("FirstLoginParent.stepOne.subTitle")}
    </Typography>
  );

  const renderFirstLoginParentForm = () => {
    return (
      <>
        <form className="">
          <Grid container spacing={2}>
            <Grid item xs={4} sm={6} md={12}>
              <FormLabel className="FormLabel">First Name</FormLabel>
              <TextField
                className="GenericFormFieldMargin"
                onChange={(e) => handleChangeFormData(e)}
                value={formData.firstName}
                placeholder="Type here"
                variant="outlined"
                fullWidth
                name="firstName"
              />
            </Grid>
            <Grid item xs={4} sm={6} md={12}>
              <FormLabel className="FormLabel">Last Name</FormLabel>
              <TextField
                className="GenericFormFieldMargin"
                onChange={(e) => handleChangeFormData(e)}
                value={formData.lastName}
                placeholder="Type here"
                variant="outlined"
                fullWidth
                name="lastName"
              />
            </Grid>
            <Grid item xs={4} sm={6} md={12}>
              <FormLabel className="FormLabel">Country</FormLabel>
              <Autocomplete
                disablePortal
                options={[{ id: 1, label: "India" }]}
                renderInput={(params) => (
                  <TextField
                    className="GenericFormFieldMargin"
                    {...params}
                    fullWidth
                    placeholder="Select"
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </>
    );
  };
  /* Stepper One component dependencies */

  return (
    <>
      {renderTitle()}
      {renderSubTitle()}
      {renderFirstLoginParentForm()}
    </>
  );
};

export default StepperOne;