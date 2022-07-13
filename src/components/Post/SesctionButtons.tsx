import EditIcon from '@mui/icons-material/Edit'
import { Box, IconButton, Stack, Tooltip } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

type SectionButtonsProps = {
  copyUrl: string
  editUrl: string
}

export const SectionButtons: FC<SectionButtonsProps> = ({ copyUrl, editUrl }) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()
  return (
    <Box>
      <Stack direction="row">
        {isAuthenticated ? (
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => navigate(editUrl)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <></>
        )}
        {/* <Tooltip title="Copy URL">
          <IconButton size="small" onClick={() => copy(copyUrl)}>
            <LinkIcon />
          </IconButton>
        </Tooltip> */}
      </Stack>
    </Box>
  )
}

// const copy = async (url: string) => {
//   if ('clipboard' in navigator) {
//     return await navigator.clipboard.writeText(url)
//   } else {
//     return document.execCommand('copy', true, url)
//   }
// }
