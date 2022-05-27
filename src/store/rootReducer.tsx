import { combineReducers } from 'redux';

import { AppReducer } from './appSlice/appSlice';
import { articlesReducer } from './articlesSlice/articlesSlice';
import { singleArticleReducer } from './singleArticleSlice/singleArticleSlice';

export const rootReducer = combineReducers({
  articles: articlesReducer,
  app: AppReducer,
  singleArticle: singleArticleReducer,
});
