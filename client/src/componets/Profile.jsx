import React from 'react';
import '../styless/profile.css';

const Profile = ({ login, handleLogout }) => {
  return (
    <div className='profile'>
      <h2 className='profile__name'>{login}</h2>
      <ul className='profile__scores'>
        <li className='profile__score'>Лучшая попытка: {0}</li>
        <span className='profile__text'>Последние 3 попытки</span>
        <li className='profile__score'>Счет: {0}</li>
        <li className='profile__score'>Счет: {0}</li>
        <li className='profile__score'>Счет: {0}</li>
      </ul>
      <button className='profile__logout' onClick={handleLogout}>
        Выйти из профиля
      </button>
    </div>
  );
};

export default Profile;
