import React, { FC } from 'react';

import { Header } from 'components/header/Header';

import s from './layout.module.scss';
interface PropsChildren {
  children: React.ReactNode;
}
const Layout: FC<PropsChildren> = ({ children }) => {
  return (
    <>
      <div className={s.container}>
        <Header></Header>
        {children}
      </div>
    </>
  );
};

export { Layout };
