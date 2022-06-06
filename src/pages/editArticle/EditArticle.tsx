import { FC } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { endpoints } from 'services/apiServices';
import { errorModal } from 'helpers/errorModal';
import { message } from 'helpers/signUpMessage';
import { ArticleForm } from 'components/articleForm/ArticleForm';
import { ICreateArticle } from 'pages/createArticle/createArticle.types';
import { useAppSelector } from 'store/store';

const EditArticle: FC = () => {
  const { slug } = useAppSelector(state => state.singleArticle.article);
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
  return <ArticleForm title="Edit article" submitHandler={submitFunc} />;
};

export { EditArticle };
