import { FC, useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { AxiosError } from 'axios';

import { errorModal } from 'helpers/errorModal';
import { message } from 'helpers/signUpMessage';
import { endpoints } from 'services/apiServices';
import { addArticle } from 'store/singleArticleSlice/singleArticleSlice';
import { useAppSelector } from 'store/store';
import { ArticleItem } from 'components/articleItem/ArticleItem';
import { useAuth } from 'hooks/useAuth';

import s from './singleArticlePage.module.scss';

type QuizParams = {
  slug: string;
};

const SingleArticlePage: FC = () => {
  const { slug } = useParams<QuizParams>();
  const [isLoading, setIsLoading] = useState(true);
  const [showFlag, setShowFlag] = useState(false);
  const articleData = useAppSelector(state => state.singleArticle.article);
  const navigate = useNavigate();
  const { isAuth, username } = useAuth();

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchArticle() {
      const response = await endpoints.getArticle(slug);
      const data = response.data;
      const userCreator = data.article.author.username;
      if (username === userCreator) {
        setShowFlag(true);
      }
      dispatch(addArticle(response.data));
      setIsLoading(false);
    }
    fetchArticle();
  }, [dispatch, slug, username]);

  const deleteArticle = () => {
    async function fetchDeleteArticle() {
      try {
        await endpoints.deleteArticle(slug);
        navigate('/', { replace: true });
      } catch (error) {
        const err = error as AxiosError;
        const errObj = JSON.parse(err?.response?.request.responseText);
        console.log(errObj);
        errorModal(message(errObj));
      }
    }
    fetchDeleteArticle();
  };
  return !isLoading ? (
    <div className={s['single-article']}>
      <ArticleItem dataArt={articleData} />
      <ReactMarkdown className={s['single-article__text']}>
        {articleData.body}
      </ReactMarkdown>
      {isAuth && showFlag ? (
        <Space size={12} className={s['buttons-wrapper']}>
          <Popconfirm
            title="Are you sure to delete this article?"
            onConfirm={deleteArticle}
            okText="Yes"
            cancelText="No"
          >
            <Button className={s['button-delete']}>Delete</Button>
          </Popconfirm>
          <Button className={s['button-edit']} onClick={() => navigate('edit')}>
            Edit
          </Button>
        </Space>
      ) : null}
    </div>
  ) : (
    <Spin />
  );
};

export { SingleArticlePage };
