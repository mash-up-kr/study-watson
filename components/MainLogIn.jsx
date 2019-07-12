import React, { useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { LOAD_STUDIES_REQUEST } from '../reducers/study';
import { StyledButton } from '../common/StyledComponents';
import { getCookie } from '../common/cookie';

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
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin-top: 1rem;
`;

const StyledTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0077ff;
  font-weight: 900;
`;

const MainLogIn = () => {
  const { pk } = useSelector(state => state.user);
  const { studies } = useSelector(state => state.study);

  const dispatch = useDispatch();

  const onClick = () => {
    Router.pushRoute('/addStudy');
  };

  useEffect(() => {
    const token = getCookie('token');
    dispatch({
      type: LOAD_STUDIES_REQUEST,
      token,
      pk,
    });
  }, []);

  return (
    <div>
      <div>
        {studies.length >= 1 ? (
          <>
            {studies.map((study, idx) => {
              return (
                <StyledCard
                  key={idx}
                  onClick={() => {
                    Router.pushRoute(`/studyDetail/${study.pk}`);
                  }}
                >
                  <StyledTitle>{study.study.name}</StyledTitle>
                  <div>{study.study.description}</div>
                  <br />
                </StyledCard>
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

export default MainLogIn;
