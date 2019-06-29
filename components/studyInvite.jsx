import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';

import { StyledButton, StyledLabel, StyledInput, StyledTitle, StyledForm } from '../common/StyledComponents';

const StyledContainer = styled.div`
  height: calc(100vh - 110px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledLink = styled.div`
  border: 1px solid #EDEDED;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  margin: 0.5rem 0 1.5rem 0;
`;

const StyledSmallButton = styled.button`
  width: 100%;
  padding: 1rem 3rem;
  font-size: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  border: 2px solid #0077FF;
`;

const StudyInvite = ({ link }) => {
  const [show, setShow] = useState(false);

  const clickLink = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 800);
  };

  const onClick = () => {
    Router.pushRoute('/');
  };

  return (
    <StyledContainer>
      <img src='/static/icon-send.svg' alt='send icon' style={{ 'margin-bottom': '1rem' }} />
      <div>링크를 공유해서 스터디원을 초대해보세요</div>
      <StyledLink>{link}</StyledLink>
      <StyledSmallButton onClick={clickLink} name="make" type="button">
        링크 복사
      </StyledSmallButton>
      {show && <h5>링크가 복사되었습니다!</h5>}
      <br />
      <StyledButton type='button' value='홈으로 돌아가기' onClick={onClick} />
    </StyledContainer>
  );
};
StudyInvite.propTypes = {
  link: PropTypes.string.isRequired,
};

export default StudyInvite;
