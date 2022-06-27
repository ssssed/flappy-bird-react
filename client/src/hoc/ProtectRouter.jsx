import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectRouter = ({ isLogin, children }) =>
  isLogin ? children : <Navigate to='login' />;

export default ProtectRouter;
