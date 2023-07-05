import React from 'react'
import './PopperToCopy.css'
import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import { CopyTextToClipboard } from '../copyTextToClipboard/CopyTextToClipboard'

type Props = {
  open: boolean
  children?: React.ReactNode
  anchorEl?: HTMLButtonElement | null
  placement?: PopperPlacementType
  text: string
  classNameTypography: string
  classNameData: string
  classNameIcon: string
  color: string
}

export default function PopperToCopy(props: Props) {
  return (
    <Popper
      open={props.open}
      anchorEl={props.anchorEl}
      placement={props.placement}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <Typography className={props.classNameTypography} sx={{ p: 2 }}>
              <div className={props.classNameData}>{props.text}</div>
              <div className={props.classNameIcon}>
                <CopyTextToClipboard color={props.color} text={props.text} />
              </div>
            </Typography>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}
