import React from 'react'
import './PopperToCopy.css'
import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import { CopyTextToClipboard } from '../../copyTextToClipboard/CopyTextToClipboard'

type Props = {
  style?: HTMLElement
  open: boolean
  children?: React.ReactNode
  anchorEl?: HTMLButtonElement | null
  placement?: PopperPlacementType
  text: string
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
            <Typography className="typography" sx={{ p: 2 }}>
              <div className="copyData">{props.text}</div>
              <div className="copyIcon">
                <CopyTextToClipboard color="#D4D4D4" text={props.text} />
              </div>
            </Typography>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}
