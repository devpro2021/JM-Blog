import { createSlice } from '@reduxjs/toolkit';

import { IArticle } from '../articlesSlice/article.types';
interface SingleArticle {
  article: IArticle;
  isLoading: boolean;
}
const singleArticleSlice = createSlice({
  name: 'singleArticle',
  initialState: {
    article: {},
    isLoading: true,
  } as SingleArticle,
  reducers: {
    addArticle: (state, { payload }) => {
      state.article = { ...payload.article };
      state.isLoading = false;
    },
  },
});

export const { addArticle } = singleArticleSlice.actions;
export const singleArticleReducer = singleArticleSlice.reducer;
