import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import React from 'react'
import './Popup.css'
import { CloseCircleIcon } from '../../../../assets/svgs/svg-components'

type VoidFunction = () => void

type Props = {
  style?: HTMLElement
  open: boolean
  handleClose: VoidFunction
  onSubmit: VoidFunction
  title: string
  children?: React.ReactNode
  submitButton: boolean
  cancleButton: boolean
  submitText: string
  cancleText: string
}

export default function Popup(props: Props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: '390px!important',
          minWidth: '390px !important',
          backgroundColor: '#FAFAF4',
          minHeight: '324px !important',
          textAlign: 'center',
        },
      }}
    >
      <div className="closeIcon" onClick={props.handleClose}>
        <CloseCircleIcon />
      </div>
      <DialogTitle id="alert-dialog-title">
        <span className="title">{props.title}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.children}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="dialogActions">
        {props.cancleButton && (
          <Button className="cancleButton" onClick={props.handleClose}>
            {props.cancleText}
          </Button>
        )}
        {props.submitButton && (
          <Button className="submitButton" onClick={props.onSubmit} autoFocus>
            {props.submitText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
