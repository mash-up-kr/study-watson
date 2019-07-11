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

const StyledEmailButton = styled.button`
  position: fixed;
  bottom: 1rem;
  width: calc(100% - 2rem);
  padding: 1rem 0;
  font-size: 1rem;
  color: #fff;
  background-color: #0077FF;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SignupStart = ({ setDepth }) => {
  return (
    <StyledContainer>
      <Start />
      <StyledEmailButton onClick={() => setDepth(true)}>
        <img
          src="/static/icon-mail.svg"
          alt="mail icon"
          style={{ marginRight: '1rem' }}
        />
        이메일로 가입하기
      </StyledEmailButton>
    </StyledContainer>
  );
};

SignupStart.propTypes = {
  setDepth: PropTypes.func.isRequired,
};

export default SignupStart;
