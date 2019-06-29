import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from '../components/Header';
import Main from '../components/Main';

const StyledIndex = styled.div`
width: 100vw;
height: 100vh;
`;

const Index = () => {
  return (
    <StyledIndex>
      <Header />
      <Main />
    </StyledIndex>
  );
};

export default Index;
