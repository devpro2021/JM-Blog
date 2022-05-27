import { FC } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { IArticle } from '../../store/articlesSlice/article.types';

import s from './articleItem.module.scss';

const ArticleItem: FC<{ dataArt: IArticle }> = ({ dataArt }) => {
  const {
    slug,
    createdAt,
    description,
    favoritesCount,
    tagList,
    title,
    author,
  } = dataArt;
  const { username, image } = author;
  const cx = classNames.bind(s);
  const userClasses = cx('article__user-info', 'user-info');
  return (
    <div className={s.article}>
      <div className={s.article__inner}>
        <div className={s.article__info}>
          <div className={s['article__title-wrapper']}>
            <Link to={`/articles/${slug}`}>
              <h2 className={s.article__title}>{title}</h2>
            </Link>
            <button type="button" className={s.article__likes} disabled>
              {favoritesCount}
            </button>
          </div>
          <div className={s.article__tags}>
            {tagList
              ? tagList.map((tag, index) => {
                  return tagList[0] !== '' ? (
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
            <div className={s['user-info__name']}>{username}</div>
            <div className={s['user-info__date']}>
              {format(new Date(createdAt), 'LLLL d,y')}
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
