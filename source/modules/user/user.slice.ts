import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IUser} from './user.model';

const initialState: IUser = {
  userName: '',
  imageUrl: '',
  fullName: '',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.userName = action.payload.userName;
      state.imageUrl = action.payload.imageUrl;
      state.fullName = action.payload.fullName;
    },
  },
});

export default userSlice.reducer;
export const {setUser} = userSlice.actions;
