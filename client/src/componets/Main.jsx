import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styless/startscreen.css';

const Main = () => {
  const navigate = useNavigate();
  const handleStartGame = () => navigate('/game');
  return (
    <div className='start-screen'>
      <div className='start-screen__container'>
        <h2 className='start-screem__title'>
          Нажмите на кнопку чтобы начать. Перед началом зайдите в "
          <Link className='start-screem__link' to='/managment'>
            Управление
          </Link>
          "
        </h2>
        <button onClick={handleStartGame} className='start-screen__button'>
          Начать играть!
        </button>
      </div>
    </div>
  );
};

export default Main;
