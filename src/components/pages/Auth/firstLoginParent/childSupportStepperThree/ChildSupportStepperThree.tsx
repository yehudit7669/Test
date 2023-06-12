import { Grid, TextField, Typography, Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import MultipleSelectableChips from "../../../../common/multipleSelectableChips/MultipleSelectableChips";

type Props = {
  setFirstLoginParentDetails:(value:object)=>void
}

const StepperThree = ({setFirstLoginParentDetails}:Props) => {
  /* i18n translation dependencies */
  const { t } = useTranslation();
  /* i18n translation dependencies */

  /* Form submission dependencies */
  const [other, setOther] = useState("");
  /* Form submission dependencies */

  /* Temporary static data for chips - This will be obtained by an API call */
  type childEducationChipTypes = {
    id:string,
    label:string, 
    selected:boolean
  }[]
  const [childEducationChips, setChildEducationChips] = useState<childEducationChipTypes>([{id:'1',label:'Clickable',selected:false},{id:'2',label:'Another',selected:false}])
  /* Temporary static data for chips - This will be obtained by an API call */
  
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
      setFirstLoginParentDetails((prevValue:any)=>{
        return {
          ...prevValue,
          childEducation:{
            ...prevValue?.childEducation,
            teachingMethod: multipleSelectableChipsArr.filter((data)=>data.selected).map((data)=>data.id)
          }
        }
      })
    }
    /* Function definition passed as a prop to multiple Selectable chips to get the selected chips data */
    return (
      <>
        <MultipleSelectableChips 
        multipleSelectableChipDetails={childEducationChips} 
        setMultipleSelectableChipsDetails={setChildEducationChips} 
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
                setOther((e.target as HTMLInputElement).value)
                setFirstLoginParentDetails((prevValue:any)=>{
                  return {
                    ...prevValue,
                    childEducation:{
                          ...prevValue?.childEducation,
                          other:(e.target as HTMLInputElement).value
                        }
                    }
                })
              }}
              value={other}
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
