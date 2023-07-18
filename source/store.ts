import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authenticationSlide, {
  initAuth,
} from './modules/authentication/authentication.slide';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      thunk: true,
    }),
    ...middlewares,
  ],
});

const getAsyncStorage = () => {
  return dispatch => {
    AsyncStorage.getItem('Token').then(result => {
      console.log(result);

      // dispatch(initAuth(result));
    });
  };
};
store.dispatch(getAsyncStorage());

export default store;
