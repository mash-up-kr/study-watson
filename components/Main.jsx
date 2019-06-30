import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import MainLogIn from './MainLogIn';
import MainLogOut from './MainLogOut';

const StyledMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Main = () => {
  const { isLogin } = useSelector(state => state.user);

  return <StyledMain>{isLogin ? <MainLogIn /> : <MainLogOut />}</StyledMain>;
};

export default Main;
