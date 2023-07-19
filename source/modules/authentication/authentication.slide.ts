import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IToken} from './authentication.model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAppAsyncThunk} from '@/hooks/redux.hook';

const initialState = {
  isLogin: false,
  accessToken: '',
};

export const authInitAction = createAppAsyncThunk('auth/init', async () => {
  const result = await AsyncStorage.getItem('Token');
  if (result) {
    return JSON.parse(result);
  } else {
    throw 'error';
  }
});

const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IToken>) => {
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers(builder) {
    builder.addCase(authInitAction.fulfilled, (state, action) => {
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
    });
  },
});
export const {loginSuccess} = authenticationSlice.actions;
export default authenticationSlice.reducer;
