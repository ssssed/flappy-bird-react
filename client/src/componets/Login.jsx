import React from 'react';
import '../styless/login.css';

const Login = () => {
  return (
    <div className='login'>
      <form className='form'>
        <h2 className='form__title'>Вход</h2>
        <input type='text' placeholder='Логин' className='form__input' />
        <input type='password' placeholder='Пароль' className='form__input' />
        <button type='submit' className='form__submit'>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
