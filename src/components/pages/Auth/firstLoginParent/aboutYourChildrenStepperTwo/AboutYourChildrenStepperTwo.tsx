import {
  Autocomplete,
  Box,
  Button,
  FormLabel,
  Grid,
  Tab,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux-hooks";
import Actions from "../../../../../actions";
import CloseIcon from '@mui/icons-material/Close';

const StepperTwo = () => {
  /* i18n translation dependencies */
  const { t } = useTranslation();
  /* i18n translation dependencies */

  const dispatch = useAppDispatch()
  const {firstLoginParentDetails} = useAppSelector((state)=>state.firstLoginParent)

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
    /* If you're using Redux / NgRX, there's a chance your selector could be returning a readonly object with a reference to the store so do the following parsing and stringify */
    const newFormData =[...JSON.parse(JSON.stringify(firstLoginParentDetails.childrens))]
    const eventTargetName = (e.target as HTMLInputElement).name;
    const eventTargetValue = (e.target as HTMLInputElement).value;
    newFormData[index][eventTargetName] = eventTargetValue
    const dataToBeSent = {
      childrens: [...newFormData]
    }
    dispatch(Actions.createAction(Actions.SET_FIRST_LOGIN_PARENT_DETAILS,dataToBeSent)) 
  };
  /* OnChange dependencies */

  /* Tab dependencies */
  const [tabValue, setTabValue] = useState('1');

  const handleTabChange = (event: React.SyntheticEvent, tabValue:string) => {
    if(event && tabValue && tabValue!=="" && tabValue!==undefined){
      setTabValue(tabValue)
    }
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
      const dataToBeSent = {
          nickname: "",
          strengths: "",
          challenges: "",
          preferences: "",
          hobbies: ""
      }
      dispatch(Actions.createAction(Actions.FIRST_LOGIN_PARENT_STEPPER_TWO_ADD_CHILDREN,dataToBeSent))
      
    }
    /* Function definition on button click - Add a child */
    return (
      <>
        <TabContext value={tabValue}>
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
              {firstLoginParentDetails?.childrens?.map((_data,index)=>{
                return (
                  <Tab label={
                    <div style={{minWidth:'100px', display:"flex",justifyContent:'space-between',alignItems:'center'}}>
                    <span>{`Child ${index + 1}`}</span>
                    <IconButton style={{zIndex:999, border:'1px solid #200343', borderRadius:'50%',color:'#200343',margin:0,padding:0}} onClick={()=>console.log('removed')}><CloseIcon fontSize="small"/></IconButton>
                    </div>
                  } 
                  tabIndex={index} value={`${index + 1}`} className="Tab" />
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
            firstLoginParentDetails?.childrens?.map((_data,index)=>{
              return (
              <TabPanel value={`${index + 1}`} sx={{ padding: 0 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      onChange={(e) => handleChangeFormData(e,index)}
                      value={firstLoginParentDetails.childrens[index].nickname || ""}
                      placeholder="Nickname"
                      variant="outlined"
                      fullWidth
                      name="nickname"
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
                      value={firstLoginParentDetails?.childrens[index].strengths}
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
                      value={firstLoginParentDetails?.childrens[index].challenges}
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
                      value={firstLoginParentDetails?.childrens[index].preferences}
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
                      value={firstLoginParentDetails?.childrens[index].hobbies}
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
