import { FC, useEffect } from 'react';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { getArticle } from '../../../services/apiServices';
import { addArticle } from '../../../store/singleArticleSlice/singleArticleSlice';
import { useAppSelector } from '../../../store/store';
import { ArticleItem } from '../../articleItem/ArticleItem';

import s from './singleArticlePage.module.scss';

type QuizParams = {
  slug: string;
};

const SingleArticlePage: FC = () => {
  const { slug } = useParams<QuizParams>();
  const isLoading = useAppSelector(state => state.singleArticle.isLoading);
  const articleData = useAppSelector(state => state.singleArticle.article);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchArticle() {
      const response = await getArticle(slug);
      dispatch(addArticle(response));
    }
    fetchArticle();
  }, [dispatch, slug]);
  return !isLoading ? (
    <div className={s['single-article']}>
      <ArticleItem dataArt={articleData} />
      <ReactMarkdown className={s['single-article__text']}>
        {articleData.body}
      </ReactMarkdown>
    </div>
  ) : (
    <Spin />
  );
};

export { SingleArticlePage };
