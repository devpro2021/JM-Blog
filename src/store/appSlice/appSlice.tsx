import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAppState {
  page: number;
  isError: boolean;
  errorMessage: string;
}
interface IError {
  isError: boolean;
  errorMessage: string;
}
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    page: 1,
    isError: false,
    errorMessage: '',
  } as IAppState,
  reducers: {
    changePage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    catchError: (state, { payload }: PayloadAction<IError>) => {
      state.isError = payload.isError;
      state.errorMessage = payload.errorMessage;
    },
  },
});

export const { changePage, catchError } = appSlice.actions;
export const AppReducer = appSlice.reducer;
