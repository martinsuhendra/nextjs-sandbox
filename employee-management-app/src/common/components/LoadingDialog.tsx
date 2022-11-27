import React, { FC } from 'react'

import { CircularProgress, DialogContent, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'

interface LoadingDialogProps {
  open: boolean
  onClose?: () => void
  title?: string
}

const LoadingDialog: FC<LoadingDialogProps> = ({
  open,
  onClose,
  title = 'Loading',
}) => {
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 250,
        }}
      >
        <CircularProgress />
        <Typography mt={4} variant="body1">
          {title}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default LoadingDialog
