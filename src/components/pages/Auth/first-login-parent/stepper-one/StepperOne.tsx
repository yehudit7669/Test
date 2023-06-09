import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";
import React, { useState } from "react";

type Props = {
    handleStepperData:(e:{firstName:string,lastName:string})=>void
}

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
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
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
              <TextField
                onChange={(e) => handleChangeFormData(e)}
                value={formData.firstName}
                label="First Name"
                variant="outlined"
                fullWidth
                name="firstName"
                // onBlur={()=>handleStepperData(formData)}
                />
            </Grid>
            <Grid item xs={4} sm={6} md={12}>
              <TextField
                onChange={(e) => handleChangeFormData(e)}
                value={formData.lastName}
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lastName"
                // onBlur={()=>handleStepperData(formData)}
                />
            </Grid>
            <Grid item xs={4} sm={6} md={12}>  
              <Autocomplete
                disablePortal
                options={[{id:1,label:'India'}]}
                renderInput={(params) => (
                    <TextField 
                    {...params} 
                    fullWidth 
                    // onBlur={()=>handleStepperData(formData)}
                    label="Country" />
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
