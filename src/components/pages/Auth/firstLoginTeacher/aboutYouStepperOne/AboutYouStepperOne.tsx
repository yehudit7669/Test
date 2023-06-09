import {
  Autocomplete,
  Grid,
  TextField,
  Typography,
  FormLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";
import React, { useState } from "react";

type Props = {
  handleStepperData: (e: { firstName: string; lastName: string }) => void;
};

const StepperOne = () => {
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
      {t("FirstLoginTeacher.stepOne.title")}
    </Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("FirstLoginTeacher.stepOne.subTitle")}
    </Typography>
  );

  const renderFirstLoginTeacherForm = () => {
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
      {renderFirstLoginTeacherForm()}
    </>
  );
};

export default StepperOne;
