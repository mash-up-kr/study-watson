import React from 'react';
import styled from 'styled-components';

import Header from '../containers/Header';
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
