import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TServiceType} from './local-service.model';

const initialState: {services: Array<TServiceType>} = {
  services: [],
};

const localServiceSlice = createSlice({
  name: 'localServiceSlide',
  initialState: initialState,
  reducers: {
    setTypeService: (
      state,
      action: PayloadAction<{services: Array<TServiceType>}>,
    ) => {
      state.services = action.payload.services;
    },
  },
});

export default localServiceSlice.reducer;
export const {setTypeService} = localServiceSlice.actions;
