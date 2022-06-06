import { createSlice } from '@reduxjs/toolkit';

interface iUser {
  email: string;
  token: string;
  username: string;
  image?: string;
}
const initialState = {
  email: '',
  token: '',
  username: '',
  image: '',
} as iUser;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.email = payload.email;
      state.token = payload.token;
      state.username = payload.username;
      state.image = payload.image;
    },
    removeUser(state) {
      state.email = '';
      state.token = '';
      state.username = '';
      state.image = '';
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
