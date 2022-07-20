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
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const navigate = useNavigate();
  const storageToken = localStorage.getItem('token');
  useEffect(() => {
    if (storageToken)
      check(storageToken)
        .then((res) => {
          res.data && appstore.toogleLogin(true);
          navigate('/');
        })
        .catch((err) => appstore.toogleLogin(false));
  }, [appstore.isLogin, storageToken]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('userId');
    appstore.toogleLogin(false);
    navigate('/login');
  };
  return (
    <div className='page'>
      <GameOver />
      <Header handleLogout={handleLogout} />
      <Routes>
        <Route exact path='/' element={<ProtectRouter children={<Main />} />} />
        <Route path='/game' element={<ProtectRouter children={<Game />} />} />
        <Route
          path='/profile/:id'
          element={
            <ProtectRouter children={<Profile handleLogout={handleLogout} />} />
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/managment' element={<Managment />} />
        <Route path='/best-score' element={<ScoreTable />} />
      </Routes>
    </div>
  );
});

export default App;
