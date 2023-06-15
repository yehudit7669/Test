import { Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import React from "react";
import FormLabel from "@mui/material/FormLabel";
import MultipleSelectableChips from "../../../../common/multipleSelectableChips/MultipleSelectableChips";
import Actions from "../../../../../actions";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux-hooks";


const StepperThree = () => {
  /* i18n translation dependencies */
  const { t } = useTranslation();
  /* i18n translation dependencies */

  const dispatch = useAppDispatch();
  const {firstLoginParentDetails, childEducationChipDetails} = useAppSelector((state)=>state.firstLoginParent)
  
  /* Stepper Three component dependencies */
  const renderTitle = () => (
    <Typography className="Title">
      {" "}
      {t("FirstLoginParent.stepThree.title")}
    </Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("FirstLoginParent.stepThree.subTitle")}
    </Typography>
  );

  const renderSupportChildEducationSelectableChips = () => {
    /* Function definition passed as a prop to multiple Selectable chips to get the selected chips data */
    const handleGetSelectedChipsDetails = (multipleSelectableChipsArr:{id:string,label:string,selected:boolean}[]) => {
      /* Dispatching an action to update the selected state of the selectable chips */
      dispatch(Actions.createAction(Actions.FIRST_LOGIN_PARENT_UPDATE_CHILD_EDUCATION_CHIP_DETAILS,{multipleSelectableChipsArr}))
      /* Dispatching an action to update the selected state of the selectable chips */
      const dataToBeSent = {
        childEducation:{
          ...firstLoginParentDetails.childEducation,
          teachingMethod: multipleSelectableChipsArr.filter((data)=>data.selected).map((data)=>data.id)
        }
      }
      dispatch(Actions.createAction(Actions.SET_FIRST_LOGIN_PARENT_DETAILS,dataToBeSent))
    }
    /* Function definition passed as a prop to multiple Selectable chips to get the selected chips data */
    return (
      <>
        <MultipleSelectableChips 
        multipleSelectableChipDetails={childEducationChipDetails}  
        handleGetSelectedChipsDetails={handleGetSelectedChipsDetails} />  
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
              onChange={(e: React.SyntheticEvent) =>{
                const dataToBeSent = {
                  childEducation:{
                    ...firstLoginParentDetails.childEducation,
                    other:(e.target as HTMLInputElement).value
                  }
                }
                dispatch(Actions.createAction(Actions.SET_FIRST_LOGIN_PARENT_DETAILS,dataToBeSent))
              }}
              value={firstLoginParentDetails.childEducation.other}
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
      {renderSupportChildEducationSelectableChips()}
      {renderFirstLoginParentForm()}
    </>
  );
};

export default StepperThree;
