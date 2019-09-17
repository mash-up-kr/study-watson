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

const Main = ({ user, studies }) => {

  return (
    <StyledMain>
      {(!!user && !!user.pk) ? <MainLogIn studies={studies} /> : <MainLogOut />}
    </StyledMain>
  );
};

Main.propTypes = {
  user: PropTypes.object.isRequired,
  studies: PropTypes.array.isRequired,
};

export default Main;
