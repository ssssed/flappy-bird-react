import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router-dom';
import appstore from '../store/appstore';

const ProtectRouter = observer(({ children }) =>
  appstore.isLogin ? children : <Navigate to='login' />
);

export default ProtectRouter;
