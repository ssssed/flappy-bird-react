import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../styless/profile.css';
import { getUserInfoById } from '../utils/Api';

const Profile = ({ login, handleLogout }) => {
  const [user, setUser] = useState({ scores: [0, 0, 0, 0] });
  const { id } = useParams();
  useEffect(() => {
    getUserInfoById(id)
      .then((res) => res.data.scores.length != 0 && setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);
  let scores = user.scores;
  console.log(scores);
  return (
    <div className='profile'>
      <h2 className='profile__name'>{login}</h2>
      <ul className='profile__scores'>
        <li className='profile__score'>
          Лучшая попытка: {Math.max(...scores)}
        </li>
        <span className='profile__text'>Последние 3 попытки</span>
        <li className='profile__score'>
          Счет: {scores[scores.length - 3] || 0}
        </li>
        <li className='profile__score'>
          Счет: {scores[scores.length - 2] || 0}
        </li>
        <li className='profile__score'>
          Счет: {scores[scores.length - 1] || 0}
        </li>
      </ul>
      <button className='profile__logout' onClick={handleLogout}>
        Выйти из профиля
      </button>
    </div>
  );
};

export default Profile;
