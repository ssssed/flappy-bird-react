import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { check } from '../utils/Auth';
import './App.css';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Managment from './Managment';
import ScoreTable from './ScoreTable';

const App = () => {
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    const storageToken = localStorage.getItem('token');
    check(storageToken)
      .then((res) => res.data && setLogin(true))
      .catch((err) => setLogin(false));
  }, []);

  return (
    <div className='page'>
      <Header isLogin={isLogin} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/managment' element={<Managment />} />
        <Route path='/best-score' element={<ScoreTable />} />
      </Routes>
    </div>
  );
};

export default App;
