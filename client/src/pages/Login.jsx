import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appstore from '../store/appstore';
import '../styless/login.scss';
import { singin } from '../utils/Auth';

const Login = observer(() => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    singin(login, password).then((res) => {
      localStorage.setItem('token', res.data.token);
      appstore.setNickName(login.split('@')[0]);
      appstore.setUserId(res.data.userId);
      appstore.toogleLogin(true);
      navigate('/');
    });
  };

  return (
    <div className='login'>
      <form className='form' onSubmit={handleSubmitForm}>
        <h2 className='form__title'>Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
});

export default Login;
