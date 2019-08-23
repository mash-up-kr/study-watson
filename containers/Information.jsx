import React from 'react';
import styled from 'styled-components';

import { StyledImageText } from '../common/StyledComponents';

const StyledText = styled.div`
  color: #4d5256;
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: center;
  font-weight: lighter;
  margin-bottom: 2rem;
`;

const StyledLogo = styled.img`
  width: 100px;
  display: block;
  margin: 0 auto;
  padding: 1rem;
  align: center;
`;

const Information = () => {
  return (
    <div>
      <StyledLogo src="/static/logo-192.png" alt="logo" />

      <StyledImageText>
        효율적으로 스터디를
        <br />
        관리하는 가장 쉬운 방법
      </StyledImageText>

      <ul>
        <StyledText>일정 관리</StyledText>
        <StyledText>참여 여부 투표</StyledText>
        <StyledText>스터디 공지</StyledText>
        <StyledText>출석 관리</StyledText>
        <StyledText>멤버 관리</StyledText>
      </ul>
    </div>
  );
};

export default Information;
