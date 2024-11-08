import { cookieKeys } from '@/utils/constants/common';
import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRouter = (props: { component: React.ReactNode }) => {
  // Variables;
  const token = Cookies.get(cookieKeys.token);

  // Hooks
  const { pathname } = useLocation();

  console.log('pathname :>> ', pathname);
  return !!token ? pathname === '/' ? <Navigate to="/customers" /> : props.component : <Navigate to="/auth" />;
};

export default ProtectedRouter;
