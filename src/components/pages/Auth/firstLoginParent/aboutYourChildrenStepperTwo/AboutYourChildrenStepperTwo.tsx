import {
  Autocomplete,
  Box,
  Button,
  FormLabel,
  Grid,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  setFirstLoginParentDetails:(value:object)=>void
}

const StepperTwo = ({setFirstLoginParentDetails}:Props) => {
  /* i18n translation dependencies */
  const { t } = useTranslation();
  /* i18n translation dependencies */

  /* Form submission dependencies */
  const [formData, setFormData] = useState<{[key:string]:any}[]>([
    {
    nickName: "",
    strengths: "",
    challenges: "",
    preferences: "",
    hobbies: "",
    }
  ]);
  /* Form submission dependencies */

  /* OnChange dependencies */
  const handleChangeFormData = (e: React.SyntheticEvent, index:number) => {
    const newFormData =[...formData]
    const eventTargetName = (e.target as HTMLInputElement).name;
    newFormData[index][eventTargetName] = (e.target as HTMLInputElement).value,
    setFormData([...newFormData])
    setFirstLoginParentDetails((prevValue:any)=>{
      return {
        ...prevValue,
        childrens:newFormData
      }
    }) 
  };
  /* OnChange dependencies */

  /* Tab dependencies */
  const [tabValue, setTabValue] = useState(1);

  const handleTabChange = (event: React.SyntheticEvent) => {
    setTabValue((event.target as HTMLInputElement).tabIndex);
  };
  /* Tab dependencies */

  /* Stepper Two component dependencies */
  const renderTitle = () => (
    <Typography className="Title">
      {" "}
      {t("FirstLoginParent.stepTwo.title")}
    </Typography>
  );
  const renderSubTitle = () => (
    <Typography className="Subtitle" data-subtitle>
      {t("FirstLoginParent.stepTwo.subTitle")}
    </Typography>
  );

  const renderFirstLoginParentForm = () => {
    /* Function definition on button click - Add a child */
    const handleAddChildren = () => {
      setFormData((prevValue)=>{
        return [
          ...prevValue,
          {
            nickName: "",
            strengths: "",
            challenges: "",
            preferences: "",
            hobbies: "",
          }
        ]
      })
    }
    /* Function definition on button click - Add a child */
    return (
      <>
        <TabContext value={tabValue.toString()}>
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: { xs: 320, sm: 480 },
              bgcolor: "background.paper",
              width: "100%",
            }}
          >
            <TabList
              onChange={handleTabChange}
              className="TabList"
              variant="scrollable"
            >
              {formData?.map((_data,index)=>{
                return (
                  <Tab label={`Child ${index + 1}`} tabIndex={index + 1} value={(index + 1).toString()} className="Tab" />
                )
              })}
              <Button className=" AddAChildButton" onClick={handleAddChildren}>
                <AddIcon />
                {t("FirstLoginParent.stepTwo.addAChild")}
              </Button>

              {/* <Button className=" RemoveAChildButton" onClick={handleRemoveChildren}>
                <RemoveIcon />
                {t("FirstLoginParent.stepTwo.removeAChild")}
              </Button> */}
            </TabList>
          </Box>

          {
            formData?.map((_data,index)=>{
              return (
              <TabPanel value={(index + 1).toString()} sx={{ padding: 0 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      onChange={(e) => handleChangeFormData(e,index)}
                      value={formData[index].nickName}
                      placeholder="Nickname"
                      variant="outlined"
                      fullWidth
                      name="nickName"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Autocomplete
                      disablePortal
                      options={[]}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>

                  <Grid item xs={4} sm={6} md={12}>
                    <FormLabel className="FormLabel">
                      {t("FirstLoginParent.stepTwo.childStrengths")}
                    </FormLabel>
                    <TextField
                      className="GenericFormFieldMargin"
                      onChange={(e) => handleChangeFormData(e,index)}
                      value={formData[index].strengths}
                      placeholder="Add Text"
                      variant="outlined"
                      fullWidth
                      name="strengths"
                    />
                  </Grid>

                  <Grid item xs={4} sm={6} md={12}>
                    <FormLabel className="FormLabel">
                      {t("FirstLoginParent.stepTwo.challenges")}
                    </FormLabel>
                    <TextField
                      className="GenericFormFieldMargin"
                      onChange={(e) => handleChangeFormData(e,index)}
                      value={formData[index].challenges}
                      placeholder="Any Text"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={1.5}
                      name="challenges"
                    />
                  </Grid>

                  <Grid item xs={4} sm={6} md={12}>
                    <FormLabel className="FormLabel">
                      {t("FirstLoginParent.stepTwo.preferences")}
                    </FormLabel>
                    <TextField
                      className="GenericFormFieldMargin"
                      onChange={(e) => handleChangeFormData(e,index)}
                      value={formData[index].preferences}
                      placeholder="Any Text"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={1.5}
                      name="preferences"
                    />
                  </Grid>

                  <Grid item xs={4} sm={6} md={12}>
                    <FormLabel className="FormLabel">
                      {t("FirstLoginParent.stepTwo.passionsAndHobbies")}
                    </FormLabel>
                    <TextField
                      className="GenericFormFieldMargin"
                      onChange={(e) => handleChangeFormData(e,index)}
                      value={formData[index].hobbies}
                      placeholder="Any Text"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={1.5}
                      name="hobbies"
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              )
            })
          }
        </TabContext>
      </>
    );
  };
  /* Stepper Two component dependencies */

  return (
    <>
      {renderTitle()}
      {renderSubTitle()}
      {renderFirstLoginParentForm()}
    </>
  );
};

export default StepperTwo;
