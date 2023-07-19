import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authenticationSlide, {
  authInitAction,
} from './modules/authentication/authentication.slide';

const rootReducer = combineReducers({
  auth: authenticationSlide,
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
    }),
    ...middlewares,
  ],
});

store.dispatch(authInitAction());

export default store;
