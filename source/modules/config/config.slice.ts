import {createSlice} from '@reduxjs/toolkit';
import {permissionsType} from 'types/permissions';

type configState = {
  grantedPermissions: Array<permissionsType>;
};
const initialState: configState = {
  grantedPermissions: [],
};

const configSlice = createSlice({
  name: 'configSlice',
  initialState: initialState,
  reducers: {
    setConfig: (state, action) => {
      state.grantedPermissions = action.payload.grantedPermissions;
    },
  },
});

export const {setConfig} = configSlice.actions;

export default configSlice.reducer;
