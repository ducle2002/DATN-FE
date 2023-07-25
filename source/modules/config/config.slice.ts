import {createSlice} from '@reduxjs/toolkit';
import {TPermission} from 'types/permissions';

type configState = {
  grantedPermissions: Array<TPermission>;
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
