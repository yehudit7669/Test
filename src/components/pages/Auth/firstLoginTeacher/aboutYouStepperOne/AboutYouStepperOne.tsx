import {
  Autocomplete,
  Grid,
  TextField,
  Typography,
  FormLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux-hooks";
import Actions from "../../../../../actions";

const StepperOne = () => {
  /* i18n translation dependencies */
  const { t } = useTranslation();
  /* i18n translation dependencies */

  const dispatch = useAppDispatch()
  const {firstLoginTeacherDetails} = useAppSelector((state)=>state.firstLoginTeacher)
  console.log(firstLoginTeacherDetails,'firstLoginTeacherDetails')

  /* OnChange formData dependencies */
  const handleChangeFormData = (e: React.SyntheticEvent) => {
    const dataToBeSent = {
      [(e.target as HTMLInputElement).name] : (e.target as HTMLInputElement).value
    }
    dispatch(Actions.createAction(Actions.SET_FIRST_LOGIN_TEACHER_DETAILS,dataToBeSent))
  };
  /* OnChange formData dependencies */
  
  /* On Country changed setSelectedCountryObj */
  const onCountryChanged = (event:React.SyntheticEvent, changedValue:{id:string,label:string} | null) => {
    if(event && changedValue && changedValue!==null && changedValue!==undefined) {
      const dataToBeSent = {
        country:changedValue.label || ""
      }
      dispatch(Actions.createAction(Actions.SET_FIRST_LOGIN_TEACHER_DETAILS,dataToBeSent))
    }
  }
  /* On Country changed setSelectedCountryObj */

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
                value={firstLoginTeacherDetails.fname}
                placeholder="Type here"
                variant="outlined"
                fullWidth
                name="fname"
              />
            </Grid>
            <Grid item xs={4} sm={6} md={12}>
              <FormLabel className="FormLabel">Last Name</FormLabel>
              <TextField
                className="GenericFormFieldMargin"
                onChange={(e) => handleChangeFormData(e)}
                value={firstLoginTeacherDetails.lname}
                placeholder="Type here"
                variant="outlined"
                fullWidth
                name="lname"
              />
            </Grid>
            <Grid item xs={4} sm={6} md={12}>
              <FormLabel className="FormLabel">Country</FormLabel>
              <Autocomplete
                disableClearable={!!firstLoginTeacherDetails.country}
                disablePortal
                options={[{ id: "1", label: "India" },{id: "2", label:"Israel"}]}
                onChange={(e,value) => onCountryChanged(e,value)}
                value={[{ id: "1", label: "India" },{id: "2", label:"Israel"}].find((element)=>element.label === firstLoginTeacherDetails.country) || null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    className="GenericFormFieldMargin"
                    {...params}
                    fullWidth
                    placeholder="Select"
                    name="country"
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
