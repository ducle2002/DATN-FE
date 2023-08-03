import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TOrganizationUnitState} from './organization.model';
import {RootState} from '@/store';

const initialState: TOrganizationUnitState = {
  listOrganizations: [],
  total: 0,
};

const organizationSlice = createSlice({
  name: 'organizationSlice',
  initialState: initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<TOrganizationUnitState>) => {
      state.listOrganizations = action.payload.listOrganizations;
      state.total = action.payload.total;
    },
  },
});

export default organizationSlice.reducer;

export const {setOrganization} = organizationSlice.actions;
export const selectorOrganizationUnit = (state: RootState) =>
  state.organizationUnit.listOrganizations;
