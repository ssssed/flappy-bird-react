import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { check } from '../utils/Auth';
import './App.css';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Managment from './Managment';
import ScoreTable from './ScoreTable';
import Main from './Main';
import ProtectRouter from '../hoc/ProtectRouter';
import Profile from './Profile';

const App = () => {
  const [isLogin, setLogin] = useState(false);
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
    setLogin(false);
    navigate('/login');
  };
  return (
    <div className='page'>
      <Header isLogin={isLogin} handleLogout={handleLogout} />
      <Routes>
        <Route
          exact
          path='/'
          element={<ProtectRouter isLogin={isLogin} children={<Main />} />}
        />
        <Route
          path='/profile'
          element={
            <ProtectRouter
              isLogin={isLogin}
              children={<Profile login={login} handleLogout={handleLogout} />}
            />
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/managment' element={<Managment />} />
        <Route path='/best-score' element={<ScoreTable />} />
      </Routes>
    </div>
  );
};

export default App;
