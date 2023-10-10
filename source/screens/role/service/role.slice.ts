import {createAppAsyncThunk} from '@/hooks/redux.hook';
import {createSlice} from '@reduxjs/toolkit';
import {TRole} from './role.model';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: {role?: TRole} = {
  role: undefined,
};

export const setRoleAction = createAppAsyncThunk(
  'role/set',
  async (role: TRole) => {
    await AsyncStorage.setItem('Role', JSON.stringify(role));
    return role;
  },
);

export const initRoleAction = createAppAsyncThunk('role/init', async () => {
  const data = JSON.parse((await AsyncStorage.getItem('Role')) ?? '');
  return data;
});

const roleSlice = createSlice({
  name: 'roleSlice',
  initialState: initialState,
  reducers: {
    resetRole: state => {
      state.role = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setRoleAction.fulfilled, (state, action) => {
        state.role = action.payload;
      })
      .addCase(initRoleAction.fulfilled, (state, action) => {
        state.role = action.payload;
      });
  },
});

export default roleSlice.reducer;
