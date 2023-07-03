import { Grid, Typography, IconButton } from '@mui/material'
import { VideoInstructionsIcon } from '../../../../../../assets/svgs/svg-components'
import { useTranslation } from 'react-i18next'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import VideoPlayer from '../videoRecorderDialog/videoPlayer'
import AudioPlayer from '../audioPlayer/AudioPlayer'
import './AudioVideoInstructions.css'

export default function AudioVideoInstructions({
  videoSrc,
  audioSrc,
  audioName,
}: any) {
  /* i18n dependencies */
  const { t } = useTranslation()
  /* i18n dependencies */

  /* Accordion dependencies */
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      event && setExpanded(isExpanded ? panel : false)
    }
  /* Accordion dependencies */

  return (
    <Grid container spacing={2} className="AudioVideoInstructions_Container">
      <Grid item xs={6}>
        <AudioPlayer audioSrc={audioSrc} audioName={audioName} />
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
            <VideoPlayer
              recordVideoDuration={0}
              isStandAloneVideoPlayer={true}
              videoSrc={videoSrc}
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  )
}
