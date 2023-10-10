import {
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import authenticationSlice, {
  authInitAction,
  logoutSuccess,
} from './screens/authentication/services/auth.slice';
import configSlice, {languageInitAction} from './modules/config/config.slice';
import userSlice from './modules/user/user.slice';
import organizationSlice from './modules/organization/organization.slice';
import localServiceSlice from './screens/local-service/services/local-service.slice';
import hubconnectionSlice from './modules/hubconnection/hubconnection.slice';
import roleSlice, {initRoleAction} from './screens/role/service/role.slice';

const appReducer = combineReducers({
  auth: authenticationSlice,
  config: configSlice,
  user: userSlice,
  organizationUnit: organizationSlice,
  localService: localServiceSlice,
  hubconnection: hubconnectionSlice,
  role: roleSlice,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === logoutSuccess.type) {
    const hubconnection = state.hubconnection.hubSignalR;
    hubconnection.stop();
    state = {
      config: {language: state.language},
    };
  }
  return appReducer(state, action);
};
const middlewares: any[] = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }).prepend(middlewares),
});

store.dispatch(authInitAction());
store.dispatch(languageInitAction());
store.dispatch(initRoleAction());

export type RootState = ReturnType<typeof store.getState>;

export default store;
