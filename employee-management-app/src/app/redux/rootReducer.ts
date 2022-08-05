import { createSlice } from '@reduxjs/toolkit';

export enum Severity {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
}
interface appReducer {
  client: { toggleForm: boolean };
  snackbar: { open: boolean; message: string; severity: Severity };
}

const initialState = {
  client: { toggleForm: false },
  snackbar: { open: false, message: '', severity: Severity.SUCCESS },
};

export const reducerSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    snackbar: (state, action) => {
      if (state.snackbar.open) {
        return void (state.snackbar = {
          open: false,
          message: '',
          severity: Severity.SUCCESS,
        });
      }
      return void (state.snackbar = { open: true, ...action.payload });
    },
  },
});

export const { toggleChangeAction, snackbar } = reducerSlice.actions;
export default reducerSlice.reducer;
