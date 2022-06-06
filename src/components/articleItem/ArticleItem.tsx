import { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { Article } from 'store/singleArticleSlice/singleArticleSlice.types';
import { useAuth } from 'hooks/useAuth';
import { endpoints } from 'services/apiServices';
import likeIconFill from 'assets/icons/favourited.svg';
import likeIconEmpty from 'assets/icons/heart.svg';

import s from './articleItem.module.scss';

const ArticleItem: FC<{ dataArt: Article }> = ({ dataArt }) => {
  const {
    slug,
    createdAt,
    description,
    favorited,
    favoritesCount,
    tagList,
    title,
    author,
  } = dataArt;
  const { username, image } = author;
  const [like, setLike] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);
  const [likeIcon, setLikeIcon] = useState(likeIconEmpty);
  const { isAuth } = useAuth();
  const cx = classNames.bind(s);
  const userClasses = cx('article__user-info', 'user-info');
  useEffect(() => {
    if (favorited) {
      setLike(true);
      setLikeIcon(likeIconFill);
    }
  }, [favorited]);

  async function handleLike() {
    try {
      if (!like) {
        const response = await endpoints.addLike(slug);
        if (response.data.article.favorited) {
          setLike(true);
          setLikeIcon(likeIconFill);
          setLikeCount(response.data.article.favoritesCount);
        }
      } else {
        const response = await endpoints.removeLike(slug);
        if (!response.data.article.favorited) {
          setLike(false);
          setLikeIcon(likeIconEmpty);
          setLikeCount(response.data.article.favoritesCount);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={s.article}>
      <div className={s.article__inner}>
        <div className={s.article__info}>
          <div className={s['article__title-wrapper']}>
            <Link to={`/articles/${slug}`}>
              <h2 className={s.article__title}>{title}</h2>
            </Link>
            <div className={s['article__like-wrapper']}>
              <button
                type="button"
                className={`${s.article__likes} ${favorited ? s.active : ''}`}
                disabled={!isAuth}
                onClick={() => handleLike()}
              >
                <img src={likeIcon} alt="like-icon" />
              </button>
              <span className={s.article__count}>{likeCount}</span>
            </div>
          </div>
          <div className={s.article__tags}>
            {tagList
              ? tagList.map((tag, index) => {
                  return tag !== '' ? (
                    <div key={index} className={s.article__tag}>
                      {tag}
                    </div>
                  ) : null;
                })
              : null}
          </div>
          <p className={s.article__text}>{description}</p>
        </div>
        <div className={s.article__user}>
          <div className={userClasses}>
            <div className={s['user-info__wrapper']}>
              <div className={s['user-info__name']}>{username}</div>
              <div className={s['user-info__date']}>
                {format(new Date(createdAt), 'LLLL d,y')}
              </div>
            </div>
            <div className={s['user-info__avatar']}>
              <img src={image} alt="avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ArticleItem };
