import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TPayload = {
  articles: [];
  articlesCount: number;
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: 0,
  },
  reducers: {
    getArticles: (state, { payload }: PayloadAction<TPayload>) => {
      const { articles, articlesCount } = payload;
      state.articles = articles;
      state.articlesCount = articlesCount;
    },
  },
});

export const { getArticles } = articlesSlice.actions;
export const articlesReducer = articlesSlice.reducer;
