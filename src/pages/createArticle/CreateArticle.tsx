import { FC } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { endpoints } from 'services/apiServices';
import { errorModal } from 'helpers/errorModal';
import { message } from 'helpers/signUpMessage';
import { ArticleForm } from 'components/articleForm/ArticleForm';

import { ICreateArticle } from './createArticle.types';

const CreateArticle: FC = () => {
  const navigate = useNavigate();
  const submitFunc = (values: ICreateArticle) => {
    const newArticle = {
      article: {
        title: values.title,
        description: values.description,
        body: values.body,
        tagList: values.tagList ?? [],
      },
    };
    async function fetchNewArticle() {
      try {
        await endpoints.createNewArticle(newArticle);
        navigate('/success', { replace: true });
      } catch (error) {
        const err = error as AxiosError;
        const errObj = JSON.parse(err?.response?.request.responseText);
        console.log(errObj);
        errorModal(message(errObj));
      }
    }
    fetchNewArticle();
  };
  return <ArticleForm title="Create new account" submitHandler={submitFunc} />;
};

export { CreateArticle };
