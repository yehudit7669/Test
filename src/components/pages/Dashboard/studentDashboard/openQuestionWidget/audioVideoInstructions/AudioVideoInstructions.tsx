import {
  Grid,
  Typography,
  Divider,
  Stack,
  IconButton,
  Button,
} from '@mui/material'
import {
  CloseIconForRecorder,
  PlayIconForRecordedAnswers,
  VideoInstructionsIcon,
} from '../../../../../../assets/svgs/svg-components'
import { useTranslation } from 'react-i18next'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState, useRef } from 'react'
import './AudioVideoInstructions.css'
import VideoPlayer from '../videoRecorderDialog/videoPlayer'
import AudioPlayer from '../../../../Worksheet/widget/common/audioPlayer/AudioPlayer'

export default function AudioVideoInstructions({ videoSrc, audioSrc, audioName }: any) {
  /* i18n dependencies */
  const { t } = useTranslation()
  /* i18n dependencies */
  console.log(audioSrc,'audioSrc')

  const [expanded, setExpanded] = useState<string | false>(false)
  // const videoSrcRef = useRef<any>(null);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <Grid container spacing={2} className="AudioVideoInstructions_Container">
      <Grid item xs={6}>
        <AudioPlayer audioSrc={audioSrc} audioName={audioName}/>
      </Grid>
      <Grid item xs={6}>
        <Accordion
          className="Video_Instructions_Accordion in-fullscreen"
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            className="Video_Instructions_Accordion_Summary in-fullscreen"
            expandIcon={<ExpandMoreIcon />}
          >
            <IconButton>
              <div className="AudioVideoIcon_Container PaddingForPlayIcon_Container">
                <VideoInstructionsIcon />
              </div>
            </IconButton>
            <Typography className="videoQuestion" style={{ flexGrow: 1 }}>
              {t('Widget.videoQuestion')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <VideoPlayer isStandAloneVideoPlayer={true} videoSrc={videoSrc} />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  )
}
