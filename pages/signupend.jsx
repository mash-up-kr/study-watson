import React from 'react';
import styled from 'styled-components';

import { StyledButton } from '../common/StyledComponents';
import { Link } from '../routes';

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
  return (
    <StyledComplete>
      <img
        src="/static/icon-complete.svg"
        alt="complete icon"
        style={{ marginBottom: '1rem' }}
      />
      <div>회원가입이 완료되었습니다!</div>
      <Link route="/" href="/">
        <a>
          <StyledButton type="button" value="홈으로" />
        </a>
      </Link>
    </StyledComplete>
  );
};

export default SignUpEnd;
