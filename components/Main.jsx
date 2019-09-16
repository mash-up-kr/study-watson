import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import MainLogIn from './MainLogIn';
import MainLogOut from './MainLogOut';

const StyledMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Main = ({ user }) => {

  return (
    <StyledMain>
      {!!user ? <MainLogIn /> : <MainLogOut />}
    </StyledMain>
  );
};

Main.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Main;
