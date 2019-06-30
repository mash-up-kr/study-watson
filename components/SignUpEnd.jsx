import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';

import { StyledButton } from '../common/StyledComponents';

const StyledComplete = styled.div`
  width: calc(100% - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpEnd = () => {
  const onClick = () => {
    Router.pushRoute('/');
  };

  return (
    <StyledComplete>
      <img
        src="/static/icon-complete.svg"
        alt="complete icon"
        style={{ marginBottom: '1rem' }}
      />
      <div>회원가입이 완료되었습니다!</div>
      <StyledButton type="button" value="홈으로" onClick={onClick} />
    </StyledComplete>
  );
};

export default SignUpEnd;
