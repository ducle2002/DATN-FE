import language from '@/config/language/language';
import {createAppAsyncThunk} from '@/hooks/redux.hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TPermission} from 'types/type';

type configState = {
  grantedPermissions: Array<TPermission>;
  language: string;
};
const initialState: configState = {
  grantedPermissions: [],
  language: '',
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

export const {setConfig, setLanguage} = configSlice.actions;

export default configSlice.reducer;
