import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styless/header.scss';
import logo from '../../assets/bird.png';
import appstore from '../../store/appstore';
import { observer } from 'mobx-react-lite';

const Header = observer(({ handleLogout }) => {
  const location = useLocation();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const navToMain = () => navigate('/');
  const navToManagment = () => navigate('/managment');
  const navToRegister = () => navigate('/register');
  const navToLogin = () => navigate('/login');
  const navToBestScore = () => navigate('/best-score');
  const navToProfile = () => navigate(`/profile/${userId}`);

  return (
    <header className='header'>
      <nav className='header__navs'>
        <img src={logo} alt='logo' className='header__img' />
        <span
          className='header__nav'
          onClick={appstore.isLogin ? navToMain : navToLogin}
        >
          Начать играть
        </span>
        <span className='header__nav' onClick={navToManagment}>
          Управление
        </span>
        <span className='header__nav' onClick={navToBestScore}>
          Таблица
        </span>
        <span
          className='header__nav'
          onClick={appstore.isLogin ? navToProfile : navToLogin}
        >
          Профиль
        </span>
      </nav>
      <button
        className='header__button'
        onClick={
          appstore.isLogin
            ? handleLogout
            : location.pathname == '/login'
            ? navToRegister
            : navToLogin
        }
      >
        {appstore.isLogin
          ? 'Выйти'
          : location.pathname == '/login'
          ? 'Регистрация'
          : 'Войти'}
      </button>
    </header>
  );
});

export default Header;
