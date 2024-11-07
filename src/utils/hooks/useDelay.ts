import React from 'react';

const useDelay = () => {
  // States
  const [delaying, setDelaying] = React.useState(false);

  // Functions
  const getDelay = (callBack: () => any, time?: 1000) => {
    setDelaying(true);
    setTimeout(() => {
      callBack();
      setDelaying(false);
    }, time || 1000);
  };
  return { getDelay, delaying };
};

export default useDelay;
