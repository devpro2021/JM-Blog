import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/store';
import { endpoints } from 'services/apiServices';
import { setUser } from 'store/userSlice/userSlice';

import s from './signUp.module.scss';
import { validation } from './validation';
import { iServerError, iServerErrorData, User } from './signUp.types';

const SignUp: FC = () => {
  const [checked, setChecked] = useState(false);
  const initError = {
    username: '',
    email: '',
  };
  const [serverError, setserverError] = useState(initError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ mode: 'onChange', resolver: yupResolver(validation) });

  const onSubmit: SubmitHandler<User> = data => {
    const newUser = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    async function fetchNewUser() {
      try {
        const response = await endpoints.createNewUser(newUser);
        const { user } = response.data;
        dispatch(
          setUser({
            email: user.email,
            token: user.token,
            username: user.username,
          }),
        );
        setserverError({ ...serverError, ...initError });
        navigate('/', { replace: true });
      } catch (error) {
        const err = error as AxiosError;
        const respErr = err.response as iServerError;
        const errorData = respErr.data.errors;
        setserverError({ ...serverError, ...errorData });
      }
    }
    fetchNewUser();
  };

  const changeHandler = () => {
    setChecked(!checked);
  };

  return (
    <div className={s['form-wrapper']}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={s['form__title']}>Create new account</h1>
        <label>
          Username
          <input
            id="username"
            type="text"
            placeholder="Username"
            {...register('username')}
            style={{ borderColor: errors.username ? 'red' : '' }}
            autoFocus
          />
          {errors?.username && (
            <p className={s.error}>{errors?.username.message || 'Error'}</p>
          )}
          {serverError.username ? (
            <p className={s.error}>
              {'Пользователь с таким именем уже зарегистрирован'}
            </p>
          ) : null}
        </label>
        <label>
          Email address
          <input
            id="email"
            type="email"
            placeholder="Email address"
            {...register('email')}
            style={{ borderColor: errors.email ? 'red' : '' }}
          />
          {errors?.email && (
            <p className={s.error}>{errors?.email.message || 'Error'}</p>
          )}
          {serverError.email ? (
            <p className={s.error}>
              {'Пользователь с таким email уже зарегистрирован'}
            </p>
          ) : null}
        </label>
        <label>
          Password
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
            style={{ borderColor: errors.password ? 'red' : '' }}
          />
          {errors?.password && (
            <p className={s.error}>{errors?.password.message || 'Error'}</p>
          )}
        </label>
        <label>
          Repeat Password
          <input
            id="confirmPassword"
            type="password"
            placeholder="Password"
            {...register('confirmPassword')}
            style={{ borderColor: errors.confirmPassword ? 'red' : '' }}
          />
          {errors?.confirmPassword && (
            <p className={s.error}>
              {errors?.confirmPassword.message || 'Error'}
            </p>
          )}
        </label>
        <hr />
        <label className={s['checkbox-label']}>
          <input
            id="accept"
            type="checkbox"
            checked={checked}
            {...register('accept', { required: true })}
            onChange={changeHandler}
          />
          <span>I agree to the processing of my personal information</span>
          {errors?.accept && (
            <p className={s.error}>{errors?.accept.message || 'Error'}</p>
          )}
        </label>
        <button type="submit">Create</button>
        <p>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

export { SignUp };
