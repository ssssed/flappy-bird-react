import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styless/login.scss';
import { register } from '../utils/Auth';
import { Form, Field, Formik } from 'formik';
import appstore from '../store/appstore';

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };

  const validate = (values) => {
    const errors = {};
    if (!/[A-Za-z0-9]{3,15}\@[a-z]{2,8}\.[a-z]{2,}/g.test(values.email))
      errors.email = 'Введите коректный адрес электронной почты';
    else if (/[0-9]{3,15}\@[a-z]{2,8}\.[a-z]{2,}/g.test(values.email))
      errors.email = 'В почте должна быть хоть 1 буква';
    if (!/.{5,15}$/g.test(values.password))
      errors.password = 'Длинна пароля должна быть от 5 до 15 символов';
    else if (!/[A-Z]{1,}/g.test(values.password))
      errors.password = 'В пароле должна быть хотя бы одна буква';
    else if (!/[0-9]{1,}/g.test(values.password))
      errors.password = 'В пароле должна быть хотя бы одна цифра';
    else if (!/[!@#$%^&*]{1,}/g.test(values.password))
      errors.password =
        'В пароле должны присутствовать спец символы такие как: !@#$%^&*';
    return errors;
  };

  return (
    <div className='login register'>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => {
          appstore.setNickName(values.email.split('@')[0]);
          register(values.email, values.password).then((res) =>
            navigate('/login')
          );
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form className='form'>
            <div className='container'>
              <h2 className='form__title'>Регистрация</h2>
              <Field
                type='email'
                className='form__input'
                name='email'
                required
              />
              <span className='form__error'>
                {touched.email && errors.email}
              </span>
              <Field
                type='password'
                className='form__input'
                name='password'
                required
              />
              <span className='form__error'>
                {touched.password && errors.password}
              </span>
              <button
                type='submit'
                className={`form__submit ${
                  !isValid || !dirty ? 'form__submit_disable' : ''
                }`}
              >
                Зарегистрироваться
              </button>
              <p className='form__text'>
                Уже зарегистрированны?{' '}
                {
                  <Link to='/login' className='form__link'>
                    Войти
                  </Link>
                }
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
