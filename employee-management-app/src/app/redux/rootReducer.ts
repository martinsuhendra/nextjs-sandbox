import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  client: { toggleForm: false },
};

export const reducerSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
  },
});

export const { toggleChangeAction } = reducerSlice.actions;
export default reducerSlice.reducer;
