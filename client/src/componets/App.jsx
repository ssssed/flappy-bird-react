import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Login from './Login';
import Register from './Register';

const App = () => {
  const [isLogin, setLogin] = useState(false);
  return (
    <div className='page'>
      <Header isLogin={isLogin} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;