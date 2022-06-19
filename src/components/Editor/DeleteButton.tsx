import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WarningDialog } from '../common/WarningDialog'

type DeleteButtonProps = {
  confirmMessage: string
  disabled: boolean
  onClick: () => Promise<void>
}

export const DeleteButton: FC<DeleteButtonProps> = ({
  confirmMessage,
  disabled,
  onClick,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (deleted) {
      navigate('/')
    }
  })

  const onClickOkButton = async () => {
    await onClick()
    setDialogOpen(false)
    setDeleted(true)
  }
  const onClickCancelButton = () => {
    setDialogOpen(false)
  }
  return (
    <>
      <Button
        variant="outlined"
        disabled={disabled}
        endIcon={<DeleteIcon />}
        onClick={() => setDialogOpen(true)}>
        Delete
      </Button>
      <WarningDialog
        open={dialogOpen}
        title={confirmMessage}
        okLabel="Delete"
        cancelLabel="Cancel"
        okHandler={onClickOkButton}
        cancelHandler={onClickCancelButton}
      />
    </>
  )
}
