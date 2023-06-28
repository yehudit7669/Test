import {
  Grid,
  Typography,
  Divider,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import {
  CloseIconForRecorder,
  PlayIconForRecordedAnswers,
} from "../../../../../../assets/svgs/svg-components";
import { useTranslation } from "react-i18next";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useRef } from "react";
import "./AudioVideoInstructions.css";
import VideoPlayer from "../videoRecorderDialog/videoPlayer";
import video from "../../../../../../assets/videos/SampleVideo_720x480_20mb.mp4"

export default function AudioVideoInstructions() {
  /* i18n dependencies */
  const { t } = useTranslation();
  /* i18n dependencies */

  const [expanded, setExpanded] = useState<string | false>(false);
  const videoSrcRef = useRef<any>(null);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="AudioVideoInstructions_Container">
      <Grid item xs={6}>
        <Accordion
          className="Video_Instructions_Accordion"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="Video_Instructions_Accordion_Summary"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <IconButton onClick={() => {}}>
              <div className="AudioVideoIcon_Container PaddingForPlayIcon_Container">
                <PlayIconForRecordedAnswers />
              </div>
            </IconButton>
            <Typography className="Voice" style={{ flexGrow: 1 }}>
              {t("Widget.videoQuestion")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <VideoPlayer videoSrc={video} videoSrcRef={videoSrcRef}/>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </div>
  );
}
