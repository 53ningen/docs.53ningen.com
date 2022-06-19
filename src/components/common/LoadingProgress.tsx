import { LinearProgress } from '@mui/material'
import { useLoadingContext } from '../../context/LoadingContext'

export const LoadingProgress = () => {
  const { isLoading } = useLoadingContext()
  return <LinearProgress value={isLoading ? 0 : 100} valueBuffer={40} sx={{ opacity: isLoading ? 1 : 0 }} />
}
