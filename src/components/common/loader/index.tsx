import React from 'react';
import styles from './styles.module.css';
import { CircularProgress } from '@mui/material';
import Flex from '../flex';

interface Props {
  active?: boolean;
  children?: React.ReactNode;
}
const Loader = ({active = true, ...props}: Props) => {
  return (
    <div className={styles.container}>
      {props.children}
      {active && (
        <Flex center className={styles.active}>
          <CircularProgress />
        </Flex>
      )}
    </div>
  );
};

export default Loader;
