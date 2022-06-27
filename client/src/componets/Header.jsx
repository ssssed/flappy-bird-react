import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styless/header.css';
import logo from '../images/bird.png';

const Header = ({ isLogin }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const navToMain = () => navigate('/main');
  const navToOptions = () => navigate('/options');
  const navToRegister = () => navigate('/register');
  const navToLogin = () => navigate('/login');

  return (
    <header className='header'>
      <nav className='header__navs'>
        <img src={logo} alt='logo' className='header__img' />
        <span className='header__nav' onClick={navToMain}>
          Главная
        </span>
        <span className='header__nav' onClick={navToOptions}>
          Управление
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
