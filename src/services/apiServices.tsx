import axios, { AxiosInstance } from 'axios';

import { IArticle } from 'pages/createArticle/createArticle.types';
import { store } from 'store/store';

interface IUser {
  username: string;
  email: string;
  password: string;
  image?: string;
}
interface Idata {
  user: IUser;
}
interface ILoginData {
  user: ILoginUser;
}

interface ILoginUser {
  email: string;
  password: string;
}
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://kata.academy:8021/api',
});
axiosInstance.interceptors.request.use(config => {
  const token = store.getState().user.token;
  if (config.headers && token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});
const endpoints = {
  getAllArticles: (offset: number) =>
    axiosInstance.get(`/articles?limit=5&offset=${offset}`),
  getArticle: (slug: string | undefined) =>
    axiosInstance.get(`/articles/${slug}`),
  createNewUser: (data: Idata) => axiosInstance.post('/users', data),
  createNewArticle: (data: IArticle) => axiosInstance.post('/articles', data),
  editArticle: (slug: string | undefined, data: IArticle) =>
    axiosInstance.put(`/articles/${slug}`, data),
  deleteArticle: (slug: string | undefined) =>
    axiosInstance.delete(`/articles/${slug}`),
  loginUser: (data: ILoginData) => axiosInstance.post('/users/login', data),
  editUser: (data: Idata) => axiosInstance.put('/user', data),
  addLike: (slug: string | undefined) =>
    axiosInstance.post(`/articles/${slug}/favorite`),
  removeLike: (slug: string | undefined) =>
    axiosInstance.delete(`/articles/${slug}/favorite`),
};

export { endpoints };
