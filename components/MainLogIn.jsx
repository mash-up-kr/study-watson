import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
  StyledActionButton,
  StyledImageText,
} from '../common/StyledComponents';
import { Link } from '../routes';
import CategoryDesign from './CategoryDesign';
import CategoryDevelop from './CategoryDevelop';
import MakeStudyFAB from './MakeStudyFAB';

const StyledContainer = styled.div`
  height: calc(100vh - 110px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledCard = styled.div`
  width: calc(100vw - 2rem);
  height: 215px;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  background-color: #fff;
  position: relative;
`;

const StyledCardContainer = styled.div`
  padding-bottom: 2rem;
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0 0.55rem 0;
  color: #4d5256;
  font-weight: 900;
`;

const StyledText = styled.div`
  font-size: 0.9rem;
  color: #4d5256;
`;

const StyledIcon = styled.img`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`;

const MainLogIn = () => {
  const { studies } = useSelector(state => state.study);
  const filterStudies = studies.filter(study => {
    return study.isWithdraw === false;
  });

  return (
    <div>
      <div>
        {filterStudies.length > 0 ? (
          <>
            <StyledCardContainer>
              {filterStudies.map((study, idx) => {
                return (

                  <Link
                    key={idx}
                    route={`/studyDetail/${study &&
                      study.study &&
                      study.study.pk}`}
                    href={`/studyDetail/${study &&
                      study.study &&
                      study.study.pk}`}
                  >
                    <a>
                      <StyledCard>
                        <div>{study.study.category.name === 'Develop' ? <CategoryDevelop /> : <CategoryDesign />}</div>
                        <StyledTitle>
                          {study && study.study && study.study.name}
                        </StyledTitle>
                        <StyledText>
                          {study && study.study && study.study.description}
                        </StyledText>
                        <br />
                        {!!study && !!study.study && !!study.study.icon && (
                          <StyledIcon
                            src={study.study.icon.image}
                            alt="img"
                            style={{ width: '40px' }}
                          />
                        )}
                      </StyledCard>
                    </a>
                  </Link>
                );
              })}
            </StyledCardContainer>
            <MakeStudyFAB />
          </>
        ) : (
          <StyledContainer>
              <img
                src="/static/image_main.svg"
                alt="main illust"
                style={{ marginBottom: '2rem' }}
              />
              <StyledImageText>
                진행중인 스터디가 없습니다.
                <br />
                스터디를 만들고 관리해보세요!
              </StyledImageText>
              <Link route="/addStudy" href="/addStudy">
                <a>
                  <StyledActionButton type="button" value="스터디 만들기" />
                </a>
              </Link>
            </StyledContainer>
          )}
      </div>
    </div>
  );
};

export default MainLogIn;
