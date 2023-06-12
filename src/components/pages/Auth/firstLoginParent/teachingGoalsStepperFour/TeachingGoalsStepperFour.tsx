import { Grid, TextField, Typography, Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import MultipleSelectableChips from "../../../../common/multipleSelectableChips/MultipleSelectableChips";

type Props = {
  setFirstLoginParentDetails:(value:object)=>void
}

const StepperFour = ({setFirstLoginParentDetails}:Props) => {
  /* i18n translation dependencies */
  const { t } = useTranslation();
  /* i18n translation dependencies */

  /* Form submission dependencies */
  const [otherGoals, setOtherGoals] = useState("");
  /* Form submission dependencies */

  /* Temporary static data for chips - This will be obtained by an API call */
  type teachingGoalsChipTypes = {
    id:string,
    label:string, 
    selected:boolean
  }[]
  const [teachingGoalsChips, setTeachingGoalsChips] = useState<teachingGoalsChipTypes>([{id:'1',label:'Keep up on my child class activity',selected:false},{id:'2',label:'To advance  my child beyond class program',selected:false}])
  /* Temporary static data for chips - This will be obtained by an API call */

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

  const renderTeachingGoalsSelectableChips = () => {
    /* Function definition passed as a prop to multiple Selectable chips to get the selected chips data */
    const handleGetSelectedChipsDetails = (multipleSelectableChipsArr:{id:string,label:string,selected:boolean}[]) => {
      setFirstLoginParentDetails((prevValue:any)=>{
        return {
          ...prevValue,
          goals:{
            ...prevValue?.goals,
            options: multipleSelectableChipsArr.filter((data)=>data.selected).map((data)=>data.id)
          }
        }
      })
    }
    /* Function definition passed as a prop to multiple Selectable chips to get the selected chips data */
    return (
      <>
        <MultipleSelectableChips 
        multipleSelectableChipDetails={teachingGoalsChips} 
        setMultipleSelectableChipsDetails={setTeachingGoalsChips} 
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
              onChange={(e: React.SyntheticEvent) => {
                setOtherGoals((e.target as HTMLInputElement).value)
                setFirstLoginParentDetails((prevValue:any)=>{
                  return {
                    ...prevValue,
                    goals:{
                      ...prevValue?.goals,
                      otherGoals: (e.target as HTMLInputElement).value,
                    }
                  }
                })
              }}
              value={otherGoals}
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
      {renderTeachingGoalsSelectableChips()}
      {renderFirstLoginParentForm()}
    </>
  );
};

export default StepperFour;
