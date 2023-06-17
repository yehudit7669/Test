import { Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import React from "react";
import FormLabel from "@mui/material/FormLabel";
import MultipleSelectableChips from "../../../../common/multipleSelectableChips/MultipleSelectableChips";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/redux-hooks";
import Actions from "../../../../../actions";

const StepperFour = () => {
  /* i18n translation dependencies */
  const { t } = useTranslation();
  /* i18n translation dependencies */

  const dispatch = useAppDispatch();
  const { firstLoginParentDetails, teachingGoalsChipDetails } = useAppSelector(
    (state) => state.firstLoginParent
  );

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
    const handleGetSelectedChipsDetails = (
      multipleSelectableChipsArr: {
        id: string;
        label: string;
        selected: boolean;
      }[]
    ) => {
      /* Dispatching an action to update the selected state of the selectable chips */
      dispatch(
        Actions.createAction(
          Actions.FIRST_LOGIN_PARENT_UPDATE_TEACHING_GOALS_CHIP_DETAILS,
          { multipleSelectableChipsArr }
        )
      );
      /* Dispatching an action to update the selected state of the selectable chips */
      const dataToBeSent = {
        goals: {
          ...firstLoginParentDetails.goals,
          options: multipleSelectableChipsArr
            .filter((data) => data.selected)
            .map((data) => data.id),
        },
      };
      dispatch(
        Actions.createAction(
          Actions.SET_FIRST_LOGIN_PARENT_DETAILS,
          dataToBeSent
        )
      );
    };
    /* Function definition passed as a prop to multiple Selectable chips to get the selected chips data */
    return (
      <>
        <MultipleSelectableChips
          multipleSelectableChipDetails={teachingGoalsChipDetails}
          handleGetSelectedChipsDetails={handleGetSelectedChipsDetails}
        />
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
                const dataToBeSent = {
                  goals: {
                    ...firstLoginParentDetails.goals,
                    otherGoals: (e.target as HTMLInputElement).value,
                  },
                };
                dispatch(
                  Actions.createAction(
                    Actions.SET_FIRST_LOGIN_PARENT_DETAILS,
                    dataToBeSent
                  )
                );
              }}
              value={firstLoginParentDetails.goals.otherGoals}
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
