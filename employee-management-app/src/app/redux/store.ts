import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: {
    app: rootReducer,
  },
});

// export type AppStore = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store['getState']>;
// export type AppDispatch = AppStore['dispatch'] &
//   ThunkDispatch<RootState, void, AnyAction>;
