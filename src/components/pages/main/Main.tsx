import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getAllArticles } from '../../../services/apiServices';
import { catchError } from '../../../store/appSlice/appSlice';
import { getArticles } from '../../../store/articlesSlice/articlesSlice';
import { useAppSelector } from '../../../store/store';
import { Error } from '../../Error/Error';
import Articles from '../articles/Articles';

import s from './main.module.scss';

const Main: FC = () => {
  const page = useAppSelector(state => state.app.page);
  const isError = useAppSelector(state => state.app.isError);
  const errorMessage = useAppSelector(state => state.app.errorMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllArticles(page * 5 - 5)
      .then(response => dispatch(getArticles(response)))
      .catch(error => {
        dispatch(catchError({ isError: true, errorMessage: error.message }));
      });
  }, [page, dispatch]);
  return (
    <div className={s.main}>
      {isError ? <Error message={errorMessage} /> : <Articles />}
    </div>
  );
};

export { Main };
