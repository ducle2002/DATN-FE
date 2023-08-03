import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {IHubconnectionState} from './hubconnection.model';

const initialState: IHubconnectionState = {
  hubSignalR: undefined,
};

const HubconnectionSlice = createSlice({
  name: 'hubconnection',
  initialState,
  reducers: {
    setConnection: (state, _action: PayloadAction<signalR.HubConnection>) => {
      state.hubSignalR = _action.payload;
    },
  },
});
export const selecthubSignalR = (state: RootState) =>
  state.hubconnection.hubSignalR;

export const {setConnection} = HubconnectionSlice.actions;
export default HubconnectionSlice.reducer;
