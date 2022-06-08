import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { useAppDispatch, useAppSelector } from 'store/store';
import { endpoints } from 'services/apiServices';
import { setUser } from 'store/userSlice/userSlice';
import { errorModal } from 'helpers/errorModal';
import { message } from 'helpers/signUpMessage';

import { IeditUser } from './editProfile.types';
import { validation } from './validation';
import s from './editProfile.module.scss';

const EditProfile: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username, email, image } = useAppSelector(state => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IeditUser>({
    mode: 'onChange',
    resolver: yupResolver(validation),
  });
  const onSubmit: SubmitHandler<IeditUser> = data => {
    const newUser = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.image,
      },
    };
    async function editUser() {
      try {
        const response = await endpoints.editUser(newUser);
        const { user } = response.data;
        dispatch(
          setUser({
            email: user.email,
            token: user.token,
            username: user.username,
            image: user.image,
          }),
        );
        navigate('/', { replace: true });
      } catch (error) {
        const err = error as AxiosError;
        const errObj = JSON.parse(err?.response?.request.responseText);
        errorModal(message(errObj));
      }
    }
    editUser();
  };
  return (
    <div className={s['form-wrapper']}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={s['form__title']}>Edit Profile</h1>
        <label>
          Username
          <input
            id="username"
            type="text"
            placeholder="Username"
            {...register('username')}
            style={{ borderColor: errors.username ? 'red' : '' }}
            autoFocus
            defaultValue={username}
          />
          {errors?.username && (
            <p className={s.error}>{errors?.username.message || 'Error'}</p>
          )}
        </label>
        <label>
          Email address
          <input
            id="email"
            type="email"
            placeholder="Email address"
            {...register('email')}
            style={{ borderColor: errors.email ? 'red' : '' }}
            defaultValue={email}
          />
          {errors?.email && (
            <p className={s.error}>{errors?.email.message || 'Error'}</p>
          )}
        </label>
        <label>
          New password
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
          Avatar image (url)
          <input
            id="image"
            type="text"
            placeholder="Avatar image"
            {...register('image')}
            style={{ borderColor: errors.username ? 'red' : '' }}
            autoFocus
            defaultValue={image}
          />
          {errors?.image && (
            <p className={s.error}>{errors?.image.message || 'Error'}</p>
          )}
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export { EditProfile };
