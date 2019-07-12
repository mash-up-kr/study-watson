import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const join = () => {
  const user = useSelector(state => state.user);
  useEffect(() => {
    if (!user.isLogin) {
      window.location.href = '/';
    }
  });
  return <div>aaa</div>;
};

export default join;
