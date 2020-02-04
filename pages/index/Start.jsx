import React from 'react';
import styled from 'styled-components';

import {
  StyledActionButton,
  StyledImageText,
} from '../../common/StyledComponents';
import { Link } from '../../routes';

const StyledContainer = styled.div`
  height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.div`
  color: #4d5256;
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 2rem;
`;

const StyledImage = styled.img`
  width: 100%;
  margin-bottom: 2rem;
`;

const Start = () => {
  return (
    <StyledContainer>
      <StyledImage
        src="/static/image_main_logout.png"
        alt="main illustration"
      />
      <StyledImageText>
        효율적으로 스터디를
        <br />
        관리하는 가장 쉬운 방법
      </StyledImageText>
      <StyledText>
        스터디 관리, 제대로 하고 계신가요?
        <br />
        공지, 투표, 출결, 일정, 자료 관리 등 모든 스터디
        <br />
        관리를 스터디 왓슨에서 시작해보세요!
      </StyledText>
      <Link route="/signup" href="/signup">
        <a>
          <StyledActionButton type="button" value="지금 시작하기" />
        </a>
      </Link>
    </StyledContainer>
  );
};

export default Start;
