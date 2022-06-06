import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from 'store/store';
import { useAuth } from 'hooks/useAuth';
import avatar from 'assets/defaultavatar.png';
import { removeUser } from 'store/userSlice/userSlice';
import { changePage } from 'store/appSlice/appSlice';

import s from './header.module.scss';

const Header: FC = () => {
  const { isAuth, username, image } = useAuth();
  const dispatch = useAppDispatch();
  return (
    <div className={s.header__wrapper}>
      <p className={s.header__logo}>
        <Link to="/" onClick={() => dispatch(changePage(1))}>
          Realworld Blog
        </Link>
      </p>
      <div className={s.header__auth}>
        {!isAuth ? (
          <>
            <Link className={s['header__auth-link']} to="/sign-in">
              Sign In
            </Link>
            <Link className={s['header__auth-link--green']} to="/sign-up">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/new-article" className={s['header__create-article']}>
              Create Article
            </Link>
            <Link to="/profile" className={s.header__userInfo}>
              <p>{username}</p>
              <img src={image ? image : avatar} alt="avatar" />
            </Link>
            <Link
              to="/"
              className={s.header__logout}
              onClick={() => {
                dispatch(removeUser());
              }}
            >
              Log Out
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export { Header };
