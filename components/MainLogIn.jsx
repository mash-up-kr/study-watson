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
import AddFAB from './AddFAB';
import { changeFormat } from '../common/changeFormat';

const StyledContainer = styled.div`
  height: calc(100vh - 110px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledCard = styled.div`
  width: calc(100vw - 2rem);
  max-height: 250px;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  background-color: #fff;
  position: relative;
`;

const StyledCardBottom = styled.div`
  width: calc(100vw - 5rem);
  padding: 1rem 0 1.5rem 0;
  border-top: 1px solid #ececec;
  position: absolute;
  margin: auto;
  bottom: 0;
  font-size: 0.8rem;
  color: #878d91;
  display: flex;
  flex-direction: row;
  align-items: center;
  letter-spacing: -0.5px;
`;

const StyledCardContainer = styled.div`
  padding-bottom: 1.5rem;
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0 0.55rem 0;
  color: #4d5256;
  font-weight: 900;
  width: 80%;
  word-break: keep-all;
  line-height: 1.2;
`;

const StyledText = styled.div`
  font-size: 0.9rem;
  color: #4d5256;
  line-height: 1.4;
  margin-bottom: 4.5rem;
`;

const StyledSmallIcon = styled.img`
  margin-right: 0.4rem;
`;

const StyledIcon = styled.img`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`;

const StyledProfileContainer = styled.div`
  margin-left: auto;
  position: relative;
`;

export const StyledProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-left: -0.5rem;
  box-sizing: content-box;
`;

export const StyledProfileCount = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-size: 0.7rem;
  line-height: 24px;
  box-sizing: content-box;
`;

export const getNearestScheduleStartAt = schedules => {
  const filterSchedules =
    schedules &&
    schedules.filter(schedule => {
      return schedule.startAt > new Date().toISOString();
    });

  const recentSchedules = [...filterSchedules];
  recentSchedules.sort((a, b) => {
    if (a.startAt > b.startAt) {
      return 1;
    }
    return -1;
  });

  return recentSchedules.length > 0
    ? changeFormat(recentSchedules[0].startAt, recentSchedules[0].studyingTime)
    : '다음 일정이 없습니다';
};

const MainLogIn = ({ studies }) => {

  return (
    <div>
      <div>
        {studies.length > 0 ? (
          <>
            <StyledCardContainer>
              {studies.map((study, idx) => {
                const filterUser = study.studyMemberships.filter(user => {
                  return user.isWithdraw === false;
                });
                const userProfileCount =
                  !!filterUser &&
                  filterUser.length > 3 &&
                  `+${filterUser.length - 3}`;
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
                        <div>
                          {study.study.category.name === 'Develop' ? (
                            <CategoryDevelop />
                          ) : (
                              <CategoryDesign />
                            )}
                        </div>
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
                        <StyledCardBottom>
                          <StyledSmallIcon
                            src="/static/icon-calendar.svg"
                            alt="calendar icon"
                          />
                          {getNearestScheduleStartAt(study.studySchedules)}
                          <StyledProfileContainer>
                            {filterUser
                              .slice(0, Math.min(3, filterUser.length))
                              .map(({ user }) => {
                                return (
                                  <StyledProfileImage
                                    key={user.pk}
                                    src={user.imgProfile}
                                    alt="profile"
                                  />
                                );
                              })}
                            {filterUser.length > 3 && (
                              <StyledProfileCount>
                                {userProfileCount}
                              </StyledProfileCount>
                            )}
                          </StyledProfileContainer>
                        </StyledCardBottom>
                      </StyledCard>
                    </a>
                  </Link>
                );
              })}
            </StyledCardContainer>
            <Link route="/addStudy" href="/addStudy">
              <a>
                <AddFAB />
              </a>
            </Link>
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
