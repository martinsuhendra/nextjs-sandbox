import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { employeeApi } from '../../../lib/helper';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: {
    app: rootReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware),
});

setupListeners(store.dispatch);

// export type AppStore = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store['getState']>;
// export type AppDispatch = AppStore['dispatch'] &
//   ThunkDispatch<RootState, void, AnyAction>;
