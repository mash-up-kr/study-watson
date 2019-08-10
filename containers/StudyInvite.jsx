import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';

import { StyledButton, StyledImageText } from '../common/StyledComponents';

const StyledContainer = styled.div`
  width: calc(100vw - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledLink = styled.div`
  border: 1px solid #ededed;
  width: 100%;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  margin: 0.5rem 0 1.5rem 0;
`;

const StyledSmallButton = styled.button`
  font-size: 1rem;
  color: #fff;
  background-color: #4B2BFF;
  padding: 1rem 3rem;
  border: none;
  border-radius: 8px;
  box-shadow: 10px 10px 20px 0 rgba(0,0,0,0.1);

  :focus {
    outline: none;
  }
`;

const StyledToast = styled.div`
  width: 100%;
  padding: 1rem 0;
  background-color: #595959;
  color: #fff;
  position: fixed;
  bottom: 60px;
  font-size: 14px;
  text-align: center;
`;

const StudyInvite = ({ link }) => {
  const [show, setShow] = useState(false);

  const clickLink = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  const onClick = () => {
    Router.pushRoute('/');
  };

  return (
    <StyledContainer>
      <img
        src="/static/image_invite.svg"
        alt="send illustration"
        style={{ marginBottom: '1rem' }}
      />
      <StyledImageText>
        링크를 공유하여
        <br />
        스터디원을 초대해보세요!
      </StyledImageText>
      <StyledLink>{link}</StyledLink>
      <StyledSmallButton onClick={clickLink} name="make" type="button">
        링크 복사
      </StyledSmallButton>
      {show && <StyledToast>링크가 복사되었습니다!</StyledToast>}
      <br />
      <StyledButton type="button" value="홈으로 돌아가기" onClick={onClick} />
    </StyledContainer>
  );
};
StudyInvite.propTypes = {
  link: PropTypes.string.isRequired,
};

export default StudyInvite;
