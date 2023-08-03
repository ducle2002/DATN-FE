import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authenticationSlice, {authInitAction} from './modules/auth/auth.slice';
import configSlice from './modules/config/config.slice';
import userSlice from './modules/user/user.slice';
import organizationSlice from './modules/organization/organization.slice';
import hubconnectionSlice from './modules/hubconnection/hubconnection.slice';

const rootReducer = combineReducers({
  auth: authenticationSlice,
  config: configSlice,
  user: userSlice,
  organizationUnit: organizationSlice,
  hubconnection: hubconnectionSlice,
});

const middlewares: any[] = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
    ...middlewares,
  ],
});

store.dispatch(authInitAction());

export type RootState = ReturnType<typeof store.getState>;

export default store;
