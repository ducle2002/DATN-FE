import language from '@/config/language/language';
import {createAppAsyncThunk} from '@/hooks/redux.hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TPermission} from 'types/type';

type configState = {
  grantedPermissions: Array<TPermission>;
  language: string;
  isRefreshingPermisstions: boolean;
};
const initialState: configState = {
  grantedPermissions: [],
  language: '',
  isRefreshingPermisstions: false,
};
export const languageInitAction = createAppAsyncThunk(
  'language/init',
  async () => {
    const result = await AsyncStorage.getItem('Language');
    if (result) {
      language.changeLanguage(result);
      return result;
    } else {
      language.changeLanguage('vi');
      return 'vi';
    }
  },
);
const configSlice = createSlice({
  name: 'configSlice',
  initialState: initialState,
  reducers: {
    setConfig: (state, action) => {
      state.grantedPermissions = action.payload.grantedPermissions;
      state.isRefreshingPermisstions = false;
    },
    refreshConfig: state => {
      state.isRefreshingPermisstions = true;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      languageInitAction.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.language = action.payload;
      },
    );
  },
});

export const {setConfig, refreshConfig, setLanguage} = configSlice.actions;

export default configSlice.reducer;
