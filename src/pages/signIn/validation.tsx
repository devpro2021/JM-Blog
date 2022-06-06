import * as Yup from 'yup';

const validation = Yup.object().shape({
  email: Yup.string()
    .required('Поле обязательно к заполнению')
    .email('Email не верный'),
  password: Yup.string()
    .required('Поле обязательно к заполнению')
    .min(6, 'Пароль должен быть не менее 6 символов')
    .max(40, 'Пароль должен быть не более 40 символов'),
});

export { validation };
