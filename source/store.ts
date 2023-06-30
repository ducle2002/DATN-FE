import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authenticationSlide from './modules/authentication/authentication.slide';

const rootReducer = combineReducers({
  auth: authenticationSlide,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
    }),
});

export default store;
