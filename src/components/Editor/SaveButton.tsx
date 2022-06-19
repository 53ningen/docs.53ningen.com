import SaveIcon from '@mui/icons-material/Save'
import { Button, SxProps, Theme } from '@mui/material'
import { FC } from 'react'

type SaveButtonProps = {
  disabled: boolean
  onClick: () => void
  sx?: SxProps<Theme>
}

export const SaveButton: FC<SaveButtonProps> = ({ disabled, onClick, sx }) => {
  return (
    <Button
      sx={sx}
      variant="contained"
      disabled={disabled}
      endIcon={<SaveIcon />}
      onClick={onClick}>
      Save
    </Button>
  )
}
