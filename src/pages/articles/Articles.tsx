import { FC } from 'react';
import { Spin, Pagination } from 'antd';

import { ArticleItem } from 'components/articleItem/ArticleItem';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Article } from 'store/singleArticleSlice/singleArticleSlice.types';
import { changePage } from 'store/appSlice/appSlice';

import 'antd/dist/antd.css';
import s from './articles.module.scss';

const Articles: FC = () => {
  const dispatch = useAppDispatch();
  const articlesCount = useAppSelector(state => state.articles.articlesCount);
  const articles = useAppSelector(state => state.articles.articles);
  const page = useAppSelector(state => state.app.page);

  const changePages = (newpage: number) => {
    dispatch(changePage(newpage));
  };

  const articleList = articles.map((article: Article) => {
    return <ArticleItem key={article.slug} dataArt={article} />;
  });
  return (
    <div className={s.articles}>
      {articles.length === 0 ? <Spin /> : articleList}
      <div className={s.articles__pagination}>
        <Pagination
          defaultCurrent={1}
          current={page}
          total={articlesCount}
          onChange={changePages}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Articles;
