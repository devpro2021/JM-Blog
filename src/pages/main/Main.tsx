import { AxiosError } from 'axios';
import { FC, useEffect } from 'react';

import { endpoints } from 'services/apiServices';
import { catchError } from 'store/appSlice/appSlice';
import { getArticles } from 'store/articlesSlice/articlesSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Error } from 'components/error/Error';
import Articles from 'pages/articles/Articles';

import s from './main.module.scss';

const Main: FC = () => {
  const page = useAppSelector(state => state.app.page);
  const isError = useAppSelector(state => state.app.isError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchAllArticle() {
      try {
        const response = await endpoints.getAllArticles(page * 5 - 5);
        dispatch(getArticles(response.data));
      } catch (error) {
        const err = error as AxiosError;
        dispatch(catchError({ isError: true, errorMessage: err.message }));
      }
    }
    fetchAllArticle();
  }, [page, dispatch]);
  return <div className={s.main}>{isError ? <Error /> : <Articles />}</div>;
};

export { Main };
