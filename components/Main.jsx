import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';

import { Link } from '../routes';
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
                <div key={idx}>
                  <li>{study.title}</li>
                  <li>{study.description}</li>
                  <br />
                </div>
              );
            })}
          </>
        ) : (
          <StyledContainer>
            <img
              src="/static/icon-inbox.svg"
              alt="indox icon"
              style={{ marginBottom: '1rem' }}
            />
            <StyledText>
              참여중인 스터디가 없습니다.
              <br />
              스터디를 만들고 관리해보세요!
            </StyledText>
          </StyledContainer>
        )}
        <StyledButton type="button" value="스터디 만들기" onClick={onClick} />
      </div>
    </div>
  );
};

const Main = () => {
  const { isLogin } = useSelector(state => state.user);

  return <StyledMain>{isLogin ? <MainLogIn /> : <MainLogOut />}</StyledMain>;
};

export default Main;
