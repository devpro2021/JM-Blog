import { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './header.module.scss';

const Header: FC = () => {
  return (
    <div className={s.header__wrapper}>
      <p className={s.header__logo}>
        <Link to="/">Realworld Blog</Link>
      </p>
      <div className={s.header__auth}>
        <a className={s['header__auth-link']} href="http://">
          Sign In
        </a>
        <a className={s['header__auth-link']} href="http://">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export { Header };
