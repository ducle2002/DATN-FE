import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IToken} from './auth.model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAppAsyncThunk} from '@/hooks/redux.hook';
import {RootState} from '@/store';

type authState = {
  isLogin: boolean;
  accessToken: string;
  encryptedAccessToken: string;
  tenantId: number;
};

const initialState: authState = {
  isLogin: false,
  accessToken: '',
  encryptedAccessToken: '',
  tenantId: -1,
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
      state.encryptedAccessToken = action.payload.encryptedAccessToken;
      state.tenantId = action.payload.tenantId;
    },
    logoutSuccess: state => {
      state.isLogin = false;
      state.accessToken = initialState.accessToken;
      state.encryptedAccessToken = initialState.encryptedAccessToken;
      state.tenantId = initialState.tenantId;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      authInitAction.fulfilled,
      (state, action: PayloadAction<IToken>) => {
        state.isLogin = true;
        state.accessToken = action.payload.accessToken;
        state.encryptedAccessToken = action.payload.encryptedAccessToken;
        state.tenantId = action.payload.tenantId;
      },
    );
  },
});
export const {loginSuccess, logoutSuccess} = authenticationSlice.actions;
export default authenticationSlice.reducer;
export const selectedEncryptedAccessToken = (state: RootState) =>
  state.auth.encryptedAccessToken;
