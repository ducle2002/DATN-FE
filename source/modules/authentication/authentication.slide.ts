import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IToken} from './authentication.model';

const initialState = {
  isLogin: false,
  accessToken: '',
};
const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState: initialState,
  reducers: {
    initAuth: (state, action) => {},
    loginSuccess: (state, action: PayloadAction<IToken>) => {
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
    },
  },
});
export const {loginSuccess, initAuth} = authenticationSlice.actions;
export default authenticationSlice.reducer;
