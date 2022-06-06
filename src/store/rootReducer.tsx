import { combineReducers } from 'redux';

import { AppReducer } from './appSlice/appSlice';
import { articlesReducer } from './articlesSlice/articlesSlice';
import { singleArticleReducer } from './singleArticleSlice/singleArticleSlice';
import { userSliceReducer } from './userSlice/userSlice';

export const rootReducer = combineReducers({
  articles: articlesReducer,
  app: AppReducer,
  singleArticle: singleArticleReducer,
  user: userSliceReducer,
});
