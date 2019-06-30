import React from 'react';
import Router from 'next/router';

import Start from './Start';
import { StyledButton, StyledScreen } from '../common/StyledComponents';

const MainLogOut = () => {
  const onClick = () => {
    Router.pushRoute('/signup');
  };

  return (
    <>
      <StyledScreen>
        <Start />
      </StyledScreen>
      <StyledButton type="button" value="회원가입" onClick={onClick} />
    </>
  );
};

export default MainLogOut;
