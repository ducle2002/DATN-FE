import {createSlice} from '@reduxjs/toolkit';

type configState = {
  grantedPermissions: Array<string>;
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
