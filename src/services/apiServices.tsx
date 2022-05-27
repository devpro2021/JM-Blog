import axios from 'axios';

const BASE_URL = 'https://kata.academy:8021/api';
const ARTICLES_URL = '/articles';
const LIMIT = 5;

const request = (url: string) => {
  const res = axios
    .get(url)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err);
    });
  return res;
};

const getAllArticles = (offset: number) => {
  const url = `${BASE_URL}${ARTICLES_URL}?limit=${LIMIT}&offset=${offset}`;
  const res = request(url);
  return res;
};
const getArticle = (slug: string | undefined) => {
  const url = `${BASE_URL}${ARTICLES_URL}/${slug}`;
  const res = request(url);
  return res;
};

export { getAllArticles, getArticle };
