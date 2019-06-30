import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Start from './Start';

const StyledContainer = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledGoogleButton = styled.button`
  position: fixed;
  bottom: 1rem;
  width: calc(100% - 2rem);
  padding: 1rem 0;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SignupStart = ({ changeDepth }) => {
  return (
    <StyledContainer>
      <Start />
      <StyledGoogleButton onClick={() => changeDepth(1)}>
        <img
          src="/static/icon-google.svg"
          alt="google logo"
          style={{ marginRight: '1rem' }}
        />
        Google로 시작하기
      </StyledGoogleButton>
    </StyledContainer>
  );
};

SignupStart.propTypes = {
  changeDepth: PropTypes.func.isRequired,
};

export default SignupStart;
