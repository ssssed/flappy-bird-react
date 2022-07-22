import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appstore from '../store/appstore';
import '../styless/login.scss';
import { singin } from '../utils/Auth';
import { Formik, Field, Form } from 'formik';

const Login = observer(() => {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <div className='login'>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          singin(values.email, values.password).then((res) => {
            localStorage.setItem('token', res.data.token);
            appstore.setNickName(values.email.split('@')[0]);
            appstore.setUserId(res.data.userId);
            appstore.toogleLogin(true);
            navigate('/');
          });
        }}
      >
        <Form className='form'>
          <div className='container'>
            <h2 className='form__title'>Вход</h2>
            <Field name='email' type='email' className='form__input' />
            <Field name='password' type='password' className='form__input' />
            <button type='submit' className='form__submit'>
              Войти
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
});

export default Login;
