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
import { useLocation, useNavigate, useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";

const StepperTwo = () => {
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
    nickName: "",
    childStrengths: "",
    challenges: "",
    preferences: "",
    passionsAndHobbies: "",
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

  /* Tab dependencies */
  const [tabValue, setTabValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
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
              onChange={handleChange}
              className="TabList"
              variant="scrollable"
            >
              <Tab label="Child 1" value="1" className="Tab" />
              <Button className="Button">
                <AddIcon />
                {t("FirstLoginParent.stepTwo.addAChild")}
              </Button>
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.nickName}
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
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.childStrengths}
                  placeholder="Add Text"
                  variant="outlined"
                  fullWidth
                  name="childStrengths"
                />
              </Grid>

              <Grid item xs={4} sm={6} md={12}>
                <FormLabel className="FormLabel">
                  {t("FirstLoginParent.stepTwo.challenges")}
                </FormLabel>
                <TextField
                  className="GenericFormFieldMargin"
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.challenges}
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
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.preferences}
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
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.passionsAndHobbies}
                  placeholder="Any Text"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={1.5}
                  name="passionsAndHobbies"
                />
              </Grid>
            </Grid>
          </TabPanel>
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
