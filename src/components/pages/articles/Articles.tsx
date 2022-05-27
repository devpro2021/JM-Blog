import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Spin, Pagination } from 'antd';

import { ArticleItem } from '../../articleItem/ArticleItem';
import { IArticle } from '../../../store/articlesSlice/article.types';
import { useAppSelector } from '../../../store/store';
import { changePage } from '../../../store/appSlice/appSlice';

import s from './articles.module.scss';

import 'antd/dist/antd.css';

const Articles: FC = () => {
  const dispatch = useDispatch();
  const articlesCount = useAppSelector(state => state.articles.articlesCount);
  const articles = useAppSelector(state => state.articles.articles);
  const page = useAppSelector(state => state.app.page);

  const changePages = (newpage: number) => {
    dispatch(changePage(newpage));
  };

  const articleList = articles.map((article: IArticle) => {
    return <ArticleItem key={article.slug} dataArt={article} />;
  });
  return (
    <div className={s.articles}>
      {articles.length === 0 ? <Spin /> : articleList}
      <Pagination
        defaultCurrent={1}
        current={page}
        total={articlesCount}
        onChange={changePages}
      />
    </div>
  );
};

export default Articles;
