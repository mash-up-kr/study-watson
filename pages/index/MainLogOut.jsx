import React from 'react';
import styled from 'styled-components';

import Start from './Start';

const StyledScreen = styled.div`
  height: calc(100vh - 56px);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainLogOut = () => {
  return (
    <>
      <StyledScreen>
        <Start />
      </StyledScreen>
    </>
  );
};

export default MainLogOut;
