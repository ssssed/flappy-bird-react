import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { check } from '../utils/Auth';
import Header from './ui/Header';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Managment from '../pages/Managment';
import ScoreTable from '../pages/ScoreTable';
import Main from '../pages/Main';
import ProtectRouter from '../hoc/ProtectRouter';
import Profile from '../pages/Profile';
import Game from '../pages/Game';
import GameOver from './ui/GameOver';
import appstore from '../store/appstore';

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const [userId, setUserId] = useState(NaN);
  const [isOpen, setOpen] = useState(false);
  const [lastScore, setLastScore] = useState(0);
  const login = localStorage.getItem('login') || 'Player';
  const navigate = useNavigate();
  const storageToken = localStorage.getItem('token');
  useEffect(() => {
    if (storageToken)
      check(storageToken)
        .then((res) => {
          res.data && setLogin(true);
          navigate('/');
        })
        .catch((err) => setLogin(false));
  }, [isLogin, storageToken]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('userId');
    setLogin(false);
    navigate('/login');
  };
  return (
    <div className='page'>
      <GameOver />
      <Header isLogin={isLogin} userId={userId} handleLogout={handleLogout} />
      <Routes>
        <Route
          exact
          path='/'
          element={<ProtectRouter isLogin={isLogin} children={<Main />} />}
        />
        <Route
          path='/game'
          element={
            <ProtectRouter
              isLogin={isLogin}
              children={
                <Game
                  setOpen={setOpen}
                  isOpen={isOpen}
                  setLastScore={setLastScore}
                />
              }
            />
          }
        />
        <Route
          path='/profile/:id'
          element={
            <ProtectRouter
              isLogin={isLogin}
              children={<Profile login={login} handleLogout={handleLogout} />}
            />
          }
        />
        <Route path='/login' element={<Login setUserId={setUserId} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/managment' element={<Managment />} />
        <Route path='/best-score' element={<ScoreTable />} />
      </Routes>
    </div>
  );
};

export default App;
