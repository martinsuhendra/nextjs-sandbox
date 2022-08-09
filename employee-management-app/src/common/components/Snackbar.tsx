import React from 'react';
import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { snackbar } from '@/app/redux/rootReducer';
import useAppSelector from '@/common/hooks/useAppSelector';

const Snackbar = () => {
  const state = useAppSelector((state) => state.app.snackbar);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(snackbar({ open: false }));
  };

  return (
    <MuiSnackbar
      open={state.open}
      autoHideDuration={6000}
      onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={state.severity}
        sx={{ width: '100%' }}>
        {state.message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
