import { createSlice } from '@reduxjs/toolkit';

import { ISingleArticle } from './singleArticleSlice.types';

const singleArticleSlice = createSlice({
  name: 'singleArticle',
  initialState: {
    article: {},
  } as ISingleArticle,
  reducers: {
    addArticle: (state, { payload }) => {
      state.article = { ...payload.article };
    },
  },
});

export const { addArticle } = singleArticleSlice.actions;
export const singleArticleReducer = singleArticleSlice.reducer;
