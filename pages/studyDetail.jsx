import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';

import Axios from 'axios';
import { Link } from '../routes';
import Header from '../containers/Header';
import CategoryDesign from '../components/CategoryDesign';
import CategoryDevelop from '../components/CategoryDevelop';
import {
  LOAD_SCHEDULES_REQUEST,
  DELETE_SCHEDULE_REQUEST,
} from '../reducers/schedule';
import {
  WITHDRAW_STUDY_REQUEST,
  LOAD_STUDY_MEMBERSHIPS_REQUEST,
} from '../reducers/study';
import AddFAB from '../components/AddFAB';
import { changeFormat } from '../common/changeFormat';

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

const StyledScheduleCard = styled.div`
  position: relative;
  width: 100%;
  height: 196px;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #fff;
`;

const StyledCardTitle = styled.h2`
  font-size: 1rem;
  color: #4d5256;
  font-weight: 900;
`;

const StyledCardText = styled.div`
  font-size: 0.8rem;
  color: #878d91;
  margin-bottom: 0.5rem;
`;

const StyledAttendBtnContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: row;
`;

const StyledAttendBtn = styled.button`
  font-size: 0.8rem;
  color: #878d91;
  background-color: #ededed;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  border: none;
  margin-left: 0.5rem;
`;

const StyledDetailBtn = styled.button`
  position: absolute;
  z-index: 3;
  top: 1rem;
  right: 1rem;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
`;

const StyledDetailMenu = styled.div`
  position: absolute;
  z-index: 2;
  top: 2.5rem;
  right: 1rem;
  width: 150px;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${props => (props.show ? 'block' : 'none')};
`;

const StyledDetailItem = styled.div`
  width: 100%;
  padding: 0.5rem 0;
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
  const [click, setClick] = useState(false);

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

  const deleteSchedule = event => {
    if (window.confirm('스케쥴을 삭제 하시겠습니까?')) {
      const { pk } = event.currentTarget.dataset;
      dispatch({
        type: DELETE_SCHEDULE_REQUEST,
        data: {
          pk,
          token,
        },
      });
    }
  };

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

  const onClickVote = async event => {
    try {
      await Axios.patch(
        `https://study-watson.lhy.kr/api/v1/study/attendances/${
        event.target.dataset.pk
        }/`,
        {
          user,
          vote: event.target.dataset.vote,
        },
      );
      dispatch({
        type: LOAD_SCHEDULES_REQUEST,
        data: {
          studyId,
          token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDetailBtn = () => {
    setClick(!click);
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
        <StyledScheduleCard>
          {recentSchedules && recentSchedules.length > 0 && (
            <div key={recentSchedules[0].pk}>
              <StyledCardTitle style={{ marginBottom: '1rem' }}>
                {recentSchedules[0].subject}
              </StyledCardTitle>
              <StyledCardText>
                <img
                  src="/static/icon-calendar.svg"
                  alt="calendar icon"
                  style={{ marginRight: '0.5rem' }}
                />
                {changeFormat(recentSchedules[0].startAt)}
              </StyledCardText>
              <StyledCardText>
                <img
                  src="/static/icon-location.svg"
                  alt="calendar icon"
                  style={{ marginRight: '0.5rem' }}
                />
                {recentSchedules[0].location}
              </StyledCardText>
              <StyledCardText>
                <img
                  src="/static/icon-check.svg"
                  alt="calendar icon"
                  style={{ marginRight: '0.5rem' }}
                />
                {changeFormat(recentSchedules[0].voteEndAt)}
              </StyledCardText>

              <StyledAttendBtnContainer>
                <StyledAttendBtn
                  onClick={onClickVote}
                  data-vote="attend"
                  data-pk={
                    recentSchedules[0].selfAttendance &&
                    recentSchedules[0].selfAttendance.pk
                  }
                >
                  참석
                </StyledAttendBtn>
                <StyledAttendBtn
                  onClick={onClickVote}
                  data-vote="absent"
                  data-pk={
                    recentSchedules[0].selfAttendance &&
                    recentSchedules[0].selfAttendance.pk
                  }
                >
                  불참
                </StyledAttendBtn>
                <StyledAttendBtn
                  onClick={onClickVote}
                  data-vote="late"
                  data-pk={
                    recentSchedules[0].selfAttendance &&
                    recentSchedules[0].selfAttendance.pk
                  }
                >
                  지각
                </StyledAttendBtn>
              </StyledAttendBtnContainer>

              <StyledDetailBtn type="button" onClick={onClickDetailBtn}>
                <img src="/static/icon-detail.svg" alt="detail icon" />
              </StyledDetailBtn>

              <StyledDetailMenu show={click}>
                <StyledDetailItem>
                  <Link
                    route={`/editSchedule/${recentSchedules[0].pk}`}
                    href={`/editSchedule/${recentSchedules[0].pk}`}
                  >
                    <a>
                      <div data-pk={recentSchedules[0].pk}>수정</div>
                    </a>
                  </Link>
                </StyledDetailItem>
                <StyledDetailItem>
                  <div data-pk={recentSchedules[0].pk} onClick={deleteSchedule}>
                    삭제
                  </div>
                </StyledDetailItem>
                <StyledDetailItem>
                  {(role === 'manager' || role === 'sub_manager') && (
                    <Link
                      route={`/schedule/${recentSchedules[0].pk}`}
                      href={`/schedule/${recentSchedules[0].pk}`}
                    >
                      <a>
                        <div>출결 관리</div>
                      </a>
                    </Link>
                  )}
                </StyledDetailItem>
              </StyledDetailMenu>
            </div>
          )}
        </StyledScheduleCard>
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
      <StyledBackground show={click} />
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
