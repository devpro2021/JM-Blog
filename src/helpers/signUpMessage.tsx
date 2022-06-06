import { IError } from 'pages/signUp/signUp.types';

export const message = (errObj: IError) => {
  return `${errObj.errors?.email ? 'Данный email уже зарегистрирован' : ''} ${
    errObj.errors?.username ? 'Данный пользователь уже зарегистрирован' : ''
  }, попробуйте еще раз`;
};
