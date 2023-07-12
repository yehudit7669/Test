import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import React from 'react'
import './Popup.css'
import { CloseCircleIcon } from '../../../assets/svgs/svg-components'

type VoidFunction = () => void

type Props = {
  open: boolean
  width?: string
  height?: string
  handleClose: VoidFunction
  onSubmit: VoidFunction
  title: string
  children?: React.ReactNode
  submitButton: boolean
  cancleButton: boolean
  submitText?: string
  cancleText?: string
  classNameDialog?: string
  classNameCloseIcon?: string
  classNameTitle?: string
  classNameDialogActions?: string
  classNameCancleButton?: string
  classNameSubmitButton?: string
}

export default function Popup(props: Props) {
  return (
    <Dialog
      className={`dialogPopup`}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: props.classNameDialog }}
    >
      <div className={props.classNameCloseIcon} onClick={props.handleClose}>
        <CloseCircleIcon />
      </div>
      <DialogTitle id="alert-dialog-title">
        <span className={props.classNameTitle}>{props.title}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.children}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={props.classNameDialogActions}>
        {props.cancleButton && (
          <Button
            className={props.classNameCancleButton}
            onClick={props.handleClose}
          >
            {props.cancleText ?? 'Cancle'}
          </Button>
        )}
        {props.submitButton && (
          <Button
            className={props.classNameSubmitButton}
            onClick={props.onSubmit}
            autoFocus
          >
            {props.submitText ?? 'Save'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
