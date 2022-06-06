import * as Yup from 'yup';

const validation = Yup.object().shape({
  username: Yup.string()
    .required('Поле обязательно к заполнению')
    .min(3, 'Имя пользователя должно быть больше 3 символов')
    .max(20, 'Имя пользователя должно быть больше 20 символов'),
  email: Yup.string()
    .required('Поле обязательно к заполнению')
    .email('Email не верный'),
  password: Yup.string()
    .required('Поле обязательно к заполнению')
    .min(6, 'Пароль должен быть не менее 6 символов')
    .max(40, 'Пароль должен быть не более 40 символов'),
  confirmPassword: Yup.string()
    .required('Поле обязательно к заполнению')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  accept: Yup.bool().oneOf([true], 'Предоставьте согласие на обработку данных'),
});

export { validation };
