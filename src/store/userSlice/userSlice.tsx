import { createSlice } from '@reduxjs/toolkit';

interface iUser {
  email: string | null;
  token: string;
  username: string | null;
  image?: string | null;
}
const initialState = {
  email: null,
  token: '',
  username: null,
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
      state.email = null;
      state.token = '';
      state.username = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
