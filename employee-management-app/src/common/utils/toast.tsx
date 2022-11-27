import alertCircleFill from '@iconify/icons-eva/alert-circle-fill'
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill'
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill'
import infoFill from '@iconify/icons-eva/info-fill'
import { Icon, IconifyIcon } from '@iconify/react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { toast as reactToastify, ToastOptions } from 'react-toastify'

import theme from '@/theme'
import { ColorSchema } from '@/theme/palette'

interface SnackbarIconProps {
  icon: IconifyIcon
  color: ColorSchema
}

const SnackbarIcon = ({ icon, color }: SnackbarIconProps) => (
  <Box
    component="span"
    sx={{
      display: 'inline-flex',
      mr: 1.5,
      width: 40,
      height: 40,
      borderRadius: 1.5,
      color: `${color}.main`,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      bgcolor: (props) => alpha(props.palette[color].main, 0.16),
    }}
  >
    <Icon icon={icon} width={24} height={24} />
  </Box>
)

const ToastIcon = ({
  variant,
}: Pick<ToastCardProps, 'variant'>): JSX.Element => {
  switch (variant) {
    case 'success':
      return <SnackbarIcon icon={checkmarkCircle2Fill} color="success" />
    case 'error':
      return <SnackbarIcon icon={infoFill} color="error" />
    case 'warning':
      return <SnackbarIcon icon={alertTriangleFill} color="warning" />
    case 'primary':
    case 'info':
      return <SnackbarIcon icon={alertCircleFill} color={variant} />

    default:
      throw new Error(`Invalid variant with ${variant}`)
  }
}

interface ToastCardProps {
  message: string
  variant: ColorSchema
}

const ToastCard = ({ variant, message }: ToastCardProps): JSX.Element => (
  <Box display="flex" alignItems="center">
    <ToastIcon variant={variant} />
    <Typography variant="body1">{message}</Typography>
  </Box>
)

const options: ToastOptions = {
  style: {
    width: '100%',
    color: theme.palette.grey[800],
    backgroundColor: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightMedium,
  },
}

const toast = (message: string, variant: ColorSchema = 'primary') => {
  reactToastify(<ToastCard message={message} variant={variant} />, options)
}

export default toast
