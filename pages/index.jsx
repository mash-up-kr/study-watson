import React from 'react';
import {useSelector} from 'react-redux';

import Header from '../components/Header';
import Main from '../components/MainEmpty';

const Index = () => {
  const menuHeight = 16;
  const user = useSelector(state => state.user);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        // display: 'flex',
        // justifyContent: 'space-around',
        // alignItems: 'center',
        // flexDirection: 'column',
      }}
    >
      <Header />
      <div
        style={{
          height: `calc(100vh - ${menuHeight}px)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {
          (user.isLogin)
          ? <Main />
          : <div>메인 페이지 입니다.</div>
        }


      </div>
    </div>
  );
};

export default Index;
