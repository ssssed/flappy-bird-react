import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styless/header.css';
import logo from '../images/bird.png';

const Header = ({ isLogin }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const navToMain = () => navigate('/main');
  const navToManagment = () => navigate('/managment');
  const navToRegister = () => navigate('/register');
  const navToLogin = () => navigate('/login');
  const navToBestScore = () => navigate('/best-score');

  return (
    <header className='header'>
      <nav className='header__navs'>
        <img src={logo} alt='logo' className='header__img' />
        <span className='header__nav' onClick={navToMain}>
          Начать играть
        </span>
        <span className='header__nav' onClick={navToManagment}>
          Управление
        </span>
        <span className='header__nav' onClick={navToBestScore}>
          Таблица
        </span>
      </nav>
      <button
        className='header__button'
        onClick={location.pathname == '/login' ? navToRegister : navToLogin}
      >
        {isLogin
          ? 'Выйти'
          : location.pathname == '/login'
          ? 'Регистрация'
          : 'Войти'}
      </button>
    </header>
  );
};

export default Header;
