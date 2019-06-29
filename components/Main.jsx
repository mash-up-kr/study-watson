import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';

import Start from './Start';
import { StyledButton, StyledScreen } from '../common/StyledComponents';

const StyledMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  height: calc(100vh - 110px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledText = styled.div`
  width: 100%;
  text-align: center;
  line-height: 1.5;
`;

const StyledCard = styled.div`
  width: calc(100vw - 2rem);
  height: 200px;
  box-shadow: 10px 10px 20px 0 rgba(0,0,0,0.2);
  padding: 1rem;
  margin-top: 1rem;
`;

const StyledTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0077FF;
  font-weight: 900;
`;

const MainLogOut = () => {
  const onClick = () => {
    Router.pushRoute('/signup');
  };

  return (
    <>
      <StyledScreen>
        <Start />
      </StyledScreen>
      <StyledButton type="button" value="회원가입" onClick={onClick} />
    </>
  );
};

const MainLogIn = () => {
  const { studies } = useSelector(state => state.study);

  const onClick = () => {
    Router.pushRoute('/addStudy');
  };

  return (
    <div>
      <div>
        {studies.length >= 1 ? (
          <>
            {studies.map((study, idx) => {
              return (
                <StyledCard key={idx}>
                  <StyledTitle>{study.title}</StyledTitle>
                  <div>{study.description}</div>
                  <br />
                </StyledCard>
              );
            })}
          </>
        ) : (
          <StyledContainer>
              <img src='/static/icon-inbox.svg' alt='indox icon' style={{ 'margin-bottom': '1rem' }} />
              <StyledText>
                참여중인 스터디가 없습니다.
                <br />
                스터디를 만들고 관리해보세요!
              </StyledText>
            </StyledContainer>
          )}
        <StyledButton type='button' value='스터디 만들기' onClick={onClick} />
      </div>
    </div>
  );
};

const Main = () => {
  const { isLogin } = useSelector(state => state.user);

  return <StyledMain>{isLogin ? <MainLogIn /> : <MainLogOut />}</StyledMain>;
};

export default Main;
