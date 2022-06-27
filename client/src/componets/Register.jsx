import React from 'react';
import { Link } from 'react-router-dom';
import '../styless/login.css';

const Register = () => {
  return (
    <div className='login register'>
      <form className='form'>
        <h2 className='form__title'>Регистрация</h2>
        <input type='text' placeholder='Логин' className='form__input' />
        <input type='password' placeholder='Пароль' className='form__input' />
        <button type='submit' className='form__submit'>
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
      </form>
    </div>
  );
};

export default Register;
