import React from 'react'

import { Alert, Snackbar as MuiSnackbar } from '@mui/material'
import { useDispatch } from 'react-redux'

import { snackbar } from '@/app/redux/rootReducer'
import useAppSelector from '@/common/hooks/useAppSelector'

const Snackbar = () => {
  const { open, severity, message } = useAppSelector(
    (state) => state.app.snackbar
  )
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(snackbar({ open: false }))
  }

  return (
    <MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
