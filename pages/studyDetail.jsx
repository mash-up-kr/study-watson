import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';

import { Link } from '../routes';
import Header from '../containers/Header';
import CategoryDesign from '../components/CategoryDesign';
import CategoryDevelop from '../components/CategoryDevelop';
import BlankScheduleCard from '../components/BlankScheduleCard';
import ScheduleCard from '../components/ScheduleCard';

import {
  LOAD_SCHEDULES_REQUEST,
} from '../reducers/schedule';
import {
  WITHDRAW_STUDY_REQUEST,
  LOAD_STUDY_MEMBERSHIPS_REQUEST,
} from '../reducers/study';
import AddFAB from '../components/AddFAB';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  margin: auto;
`;

const StyledStudyInfo = styled.div`
  width: calc(100vw - 3rem);
  margin: auto;
  position: relative;
  margin-top: 1.5rem;
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0 0.55rem 0rem;
  color: #4d5256;
  font-weight: 900;
`;

const StyledText = styled.div`
  font-size: 0.9rem;
  color: #4d5256;
`;

const StyledIcon = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
`;

const StyledCardTitle = styled.h2`
  font-size: 1rem;
  color: #4d5256;
  font-weight: 900;
`;

const StyledSubTitle = styled.div`
  font-size: 0.9rem;
  color: #878d91;
  margin: 2rem 0 0.7rem 0.5rem;
`;

const StyledCardBtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledCardBtn = styled.div`
  width: calc((100vw - 3rem) / 2);
  background-color: #fff;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const StyledCardBtnWrapper = styled.a`
  display: inline-block;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
`;

const StyledCardSubTitle = styled.h3`
  font-size: 0.8rem;
  font-weight: bold;
  color: #878d91;
  margin-top: 0.4rem;
`;

const studyDetail = ({ studyId, token, pk: user }) => {
  const { schedules } = useSelector(state => state.schedule);
  const { study } = useSelector(state => state.study.memberships);
  const { pk: memberId, role, failure } = useSelector(
    state => state.study.memberships,
  );

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

  const dispatch = useDispatch();

  const onClickWithdrawStudy = () => {
    if (window.confirm('스터디를 탈퇴 하시겠습니까?')) {
      dispatch({
        type: WITHDRAW_STUDY_REQUEST,
        data: {
          token,
          memberId,
        },
      });
    }
  };

  useEffect(() => {
    if (failure) {
      Router.pushRoute('/');
    }
  }, []);

  return (
    <div>
      <Header />
      <StyledScreen>
        <StyledStudyInfo>
          {study.category.name === 'Develop' ? (
            <CategoryDevelop />
          ) : (
            <CategoryDesign />
            )}
          <StyledTitle>{study.name}</StyledTitle>
          <StyledText>{study.description}</StyledText>
          {study.icon && <StyledIcon src={study.icon.image} alt="img" />}
        </StyledStudyInfo>
        <StyledSubTitle>다음 스터디 일정</StyledSubTitle>


        {recentSchedules && recentSchedules.length > 0 ? (
          <ScheduleCard
            studyId={studyId}
            token={token}
            user={user}
            role={role}
          />
        ) : (
          <BlankScheduleCard studyId={studyId} />
          )
        }

        <StyledSubTitle>스터디 관리</StyledSubTitle>
        <StyledCardBtnContainer>
          <StyledCardBtn>
            <Link
              route={`/studyDetail/${studyId}/afterStudy`}
              href={`/studyDetail/${studyId}/afterStudy`}
            >
              <StyledCardBtnWrapper>
                <img
                  src="/static/icon-study-nextstudy.svg"
                  alt="next study icon"
                  style={{ marginBottom: '0.5rem' }}
                />
                <StyledCardTitle>다가올 스터디</StyledCardTitle>
                <StyledCardSubTitle>Next Studies</StyledCardSubTitle>
              </StyledCardBtnWrapper>
            </Link>
          </StyledCardBtn>
          <StyledCardBtn>
            <Link
              route={`/studyDetail/${studyId}/beforeStudy`}
              href={`/studyDetail/${studyId}/beforeStudy`}
            >
              <StyledCardBtnWrapper>
                <img
                  src="/static/icon-study-paststudy.svg"
                  alt="past study icon"
                  style={{ marginBottom: '0.5rem' }}
                />
                <StyledCardTitle>이전 스터디</StyledCardTitle>
                <StyledCardSubTitle>Past Studies</StyledCardSubTitle>
              </StyledCardBtnWrapper>
            </Link>
          </StyledCardBtn>
          <StyledCardBtn>
            <Link
              route={`/studyMembers/${studyId}`}
              href={`/studyMembers/${studyId}`}
            >
              <StyledCardBtnWrapper>
                <img
                  src="/static/icon-study-attendance.svg"
                  alt="attendance icon"
                  style={{ marginBottom: '0.5rem' }}
                />
                <StyledCardTitle>출석부</StyledCardTitle>
                <StyledCardSubTitle>Attendance</StyledCardSubTitle>
              </StyledCardBtnWrapper>
            </Link>
          </StyledCardBtn>
          <StyledCardBtn>
            <Link
              route={`/studyMembersInfo/${studyId}`}
              href={`/studyMembersInfo/${studyId}`}
            >
              <StyledCardBtnWrapper>
                <img
                  src="/static/icon-study-member.svg"
                  alt="member icon"
                  style={{ marginBottom: '0.5rem' }}
                />
                <StyledCardTitle>스터디 멤버</StyledCardTitle>
                <StyledCardSubTitle>Members</StyledCardSubTitle>
              </StyledCardBtnWrapper>
            </Link>
          </StyledCardBtn>
        </StyledCardBtnContainer>


        <div>
          <Link route={`/editStudy/${studyId}`} href={`/editStudy/${studyId}`}>
            <a>스터디 수정</a>
          </Link>
        </div>

        <div>
          <Link
            route={`/studyInvite/${studyId}`}
            href={`/studyInvite/${studyId}`}
          >
            <a>초대 링크 생성</a>
          </Link>
        </div>
        <div onClick={onClickWithdrawStudy}>스터디 나가기</div>


        <Link
          route={`/addSchedule/${studyId}`}
          href={`/addSchedule/${studyId}`}
        >
          <a>
            <AddFAB />
          </a>
        </Link>
      </StyledScreen>
    </div>
  );
};

studyDetail.getInitialProps = ({ ctx, token, pk }) => {
  const { studyId = 0 } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_SCHEDULES_REQUEST,
    data: {
      studyId,
      token,
    },
  });
  ctx.store.dispatch({
    type: LOAD_STUDY_MEMBERSHIPS_REQUEST,
    data: {
      studyId,
      pk,
      token,
    },
  });
  return {
    studyId,
    token,
    pk,
  };
};

studyDetail.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  pk: PropTypes.string.isRequired,
};

export default studyDetail;