import { createSlice } from '@reduxjs/toolkit'

export enum Severity {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
}

const initialState = {
  client: { toggleForm: false },
  snackbar: { open: false, message: '', severity: Severity.SUCCESS },
}

export const reducerSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm
    },
    snackbar: (state, action) => {
      if (state.snackbar.open) {
        state.snackbar = {
          open: false,
          message: '',
          severity: Severity.SUCCESS,
        }
      }
      state.snackbar = { open: true, ...action.payload }
    },
  },
})

export const { toggleChangeAction, snackbar } = reducerSlice.actions
export default reducerSlice.reducer
