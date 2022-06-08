import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/store';
import { endpoints } from 'services/apiServices';
import { setUser } from 'store/userSlice/userSlice';

import { UserIn } from './signIn.types';
import { validation } from './validation';
import s from './signIn.module.scss';

const SignIn: FC = () => {
  const [serverError, setServerError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserIn>({ mode: 'onChange', resolver: yupResolver(validation) });

  const onSubmit: SubmitHandler<UserIn> = data => {
    const newUser = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    async function loginUser() {
      try {
        const response = await endpoints.loginUser(newUser);
        const { user } = response.data;
        dispatch(
          setUser({
            email: user.email,
            token: user.token,
            username: user.username,
            image: user.image,
            error: null,
          }),
        );
        setServerError('');
        navigate('/', { replace: true });
      } catch (error) {
        setServerError('Логин или пароль не верные');
      }
    }
    loginUser();
  };
  return (
    <div className={s['form-wrapper']}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={s['form__title']}>Sign In</h1>
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
        <p className={s['server-error']}>{serverError}</p>
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
        </p>
      </form>
    </div>
  );
};

export { SignIn };
