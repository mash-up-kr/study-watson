import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled.img`
  width: 210px;
  margin-bottom: 1.5rem;
`;

const StyledText = styled.div`
  text-align: center;
  line-height: 1.5;
`;

const Start = () => {
  return (
    <StyledContainer>
      <StyledLogo src='/static/logo.svg' alt='logo' />
      <StyledText>
        스터디 왓슨과 함께
        <br />
        쉽게 스터디를 만들고 관리해보세요!
      </StyledText>
    </StyledContainer>
  );
};

export default Start;