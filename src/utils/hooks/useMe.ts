import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch } from 'react-redux';
import { cookieKeys } from '../constants/common';
import { setUser } from '@/store/slices/user';

const useMe = () => {
  // Hooks
  const dispatch = useDispatch();

  // Effects
  React.useEffect(() => {
    const token = Cookies.get(cookieKeys.token);
    dispatch(setUser(token));
  }, []);
  return;
};

export default useMe;
