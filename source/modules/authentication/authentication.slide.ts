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
    loginSuccess: (state, action: PayloadAction<IToken>) => {
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
    },
  },
});
export const {loginSuccess} = authenticationSlice.actions;
export default authenticationSlice.reducer;
