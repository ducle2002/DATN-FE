import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authenticationSlide from './modules/authentication/authentication.slide';

const rootReducer = combineReducers({
  auth: authenticationSlide,
});

const middlewares = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    ...middlewares,
  ],
});

export default store;
