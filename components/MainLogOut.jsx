import React from 'react';

import Start from './Start';
import { StyledButton, StyledScreen } from '../common/StyledComponents';
import { Link } from '../routes';

const MainLogOut = () => {
  return (
    <>
      <StyledScreen>
        <Start />
      </StyledScreen>
      <Link route="/signup" href="/signup">
        <a>
          <StyledButton type="button" value="회원가입" />
        </a>
      </Link>
    </>
  );
};

export default MainLogOut;
