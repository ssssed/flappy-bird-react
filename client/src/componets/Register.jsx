import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styless/login.css';
import { register } from '../utils/Auth';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    register(login, password).then((res) => navigate('/login'));
  };

  return (
    <div className='login register'>
      <form className='form' onSubmit={handleSubmitForm}>
        <h2 className='form__title'>Регистрация</h2>
        <input
          type='text'
          onChange={handleLoginChange}
          value={login}
          placeholder='Логин'
          className='form__input'
        />
        <input
          type='password'
          onChange={handlePasswordChange}
          value={password}
          placeholder='Пароль'
          className='form__input'
        />
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
