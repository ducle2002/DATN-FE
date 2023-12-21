import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: initialState,
  reducers: {
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
  },
});

export default notificationSlice.reducer;
export const {setUnreadCount} = notificationSlice.actions;
