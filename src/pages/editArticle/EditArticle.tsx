/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { endpoints } from 'services/apiServices';
import { errorModal } from 'helpers/errorModal';
import { message } from 'helpers/signUpMessage';
import { ArticleForm } from 'components/articleForm/ArticleForm';
import { ICreateArticle } from 'pages/createArticle/createArticle.types';
import { useAppSelector } from 'store/store';
import { useAuth } from 'hooks/useAuth';
import { SingleArticlePage } from 'pages/singleArticlePage/SingleArticlePage';

const EditArticle: FC = () => {
  const data = useAppSelector(state => state.singleArticle);
  const {
    title: articleTitle,
    description,
    body: articleBody,
    tagList,
  } = data.article;
  const { username: userCreator } = data.article.author;
  const { slug } = useParams();
  const { username } = useAuth();
  const navigate = useNavigate();

  const newFilds = [
    {
      name: ['title'],
      value: articleTitle || null,
    },
    {
      name: ['description'],
      value: description || null,
    },
    {
      name: ['body'],
      value: articleBody || null,
    },
    {
      name: ['tagList'],
      value: tagList && tagList.length ? tagList : [''],
    },
  ];
  const [fields, setFields] = useState(newFilds);

  useEffect(() => {
    setFields(newFilds);
  }, [articleTitle, description, articleBody, tagList]);
  const submitFunc = (values: ICreateArticle) => {
    const newArticle = {
      article: {
        title: values.title,
        description: values.description,
        body: values.body,
        tagList: values.tagList ?? [],
      },
    };
    async function fetchEditArticle() {
      try {
        await endpoints.editArticle(slug, newArticle);
        navigate('/', { replace: true });
      } catch (error) {
        const err = error as AxiosError;
        const errObj = JSON.parse(err?.response?.request.responseText);
        console.log(errObj);
        errorModal(message(errObj));
      }
    }
    fetchEditArticle();
  };
  return username === userCreator ? (
    <ArticleForm
      title="Edit article"
      submitHandler={submitFunc}
      fields={fields}
    />
  ) : (
    <SingleArticlePage />
  );
};

export { EditArticle };
