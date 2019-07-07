import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';

import { StyledButton } from '../common/StyledComponents';

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
  padding: 1rem;
  font-size: 1rem;
  margin: 0.5rem 0 1.5rem 0;
`;

const StyledSmallButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  border: 1px solid #0077ff;
  color: #0077ff;
  background-color: #fff;

  :active {
    border: 1px solid #0077ff;
    background-color: #0077ff;
    color: #fff;
  }

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
        src="/static/icon-send.svg"
        alt="send icon"
        style={{ marginBottom: '1rem' }}
      />
      <div>링크를 공유해서 스터디원을 초대해보세요!</div>
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
