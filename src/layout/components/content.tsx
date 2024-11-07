import React from 'react';
import styles from '../styles.module.css';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '@/store';
import { Flex } from '@/components/common';
import { Avatar, Typography } from '@mui/material';

const Content = () => {
  return (
    <main className={styles.content}>
      <Header />
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default Content;

const Header = () => {
  // Store
  const { fullName } = useSelector((state: RootState) => state.user) || {};

  // Memos
  const lettersMemos = React.useMemo(() => {
    const splitName = fullName?.split(' ');
    const filtered = splitName?.filter((item) => item.trim());
    const sliced = filtered?.slice(0, 2);
    return sliced?.map((item) => item?.[0]);
  }, [fullName]);

  return (
    <header className={styles.header}>
      <Flex align="center" justify='flex-end' gap={'xl'}>
        <Typography>{fullName}</Typography>
        <Avatar>{lettersMemos}</Avatar>
      </Flex>
    </header>
  );
};
