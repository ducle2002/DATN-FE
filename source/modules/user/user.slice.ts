import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IUser} from './user.model';
import {RootState} from '@/store';

const initialState: IUser = {
  userName: '',
  imageUrl: '',
  fullName: '',
  userId: -1,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.userName = action.payload.userName;
      state.imageUrl = action.payload.imageUrl;
      state.fullName = action.payload.fullName;
      state.userId = action.payload.userId ?? -1;
    },
  },
});

export default userSlice.reducer;
export const {setUser} = userSlice.actions;
export const selectCurrentUser = (state: RootState) => state.user;
