import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import Button from '@mui/material/Button'
import React, { FC } from 'react'

type WarningDialogProps = {
  open: boolean
  title: string
  okLabel: string
  cancelLabel: string
  okHandler?: React.MouseEventHandler<HTMLButtonElement> | undefined
  cancelHandler?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const WarningDialog: FC<WarningDialogProps> = ({
  open,
  title,
  okLabel,
  cancelLabel,
  okHandler,
  cancelHandler,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={cancelHandler ?? (() => {})}
          autoFocus>
          {cancelLabel}
        </Button>
        <Button
          color="warning"
          variant="contained"
          onClick={okHandler ?? (() => {})}>
          {okLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
