import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Axios from 'axios';

import { Link } from '../routes';

import {
  LOAD_SCHEDULES_REQUEST,
  DELETE_SCHEDULE_REQUEST,
} from '../reducers/schedule';
import { changeFormat } from '../common/changeFormat';

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
  margin-bottom: 0.7rem;
`;

const StyledSmallIcon = styled.img`
  margin-right: 0.5rem;
  position: relative;
  top: 1.5px;
`;

const StyledAttendBtnContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

const StyledAttendText = styled.div`
  font-size: 0.8rem;
  span {
    color: #878d91;
  }
`;

const StyledDetailBtn = styled.button`
  position: absolute;
  z-index: 2;
  top: 1rem;
  right: 1rem;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
`;

const StyledDetailMenu = styled.div`
  position: fixed;
  z-index: 4;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0 1rem;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  transform: ${props => (props.show ? 'translateY(0)' : 'translateY(100%)')};
  transform-origin: bottom;
  transition: all 0.3s ease-in-out;
`;

const StyledDetailItem = styled.div`
  width: 100%;
  padding: 0.8rem 0;
  & :last-child {
    border-top: 1px solid #ededed;
  }
`;

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${props => (props.show ? 'block' : 'none')};
`;

const StyledLabel = styled.span`
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #4d5256;
`;

const StyledIcon = styled.img`
  margin-right: 1rem;
`;

const ScheduleCard = ({ schedules, studyId, token, user, role }) => {
  const [click, setClick] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [expectAtt, setExpectAtt] = useState('아직 투표하지 않았습니다');

  const dispatch = useDispatch();

  const getVote = async id => {
    const { data } = await Axios.get(
      `https://study-watson.lhy.kr/api/v1/study/attendances/${id}/`,
    );
    if (data.vote.length < 1) {
      setIsVoted(false);
    } else {
      setIsVoted(true);
      setExpectAtt(data.voteDisplay);
    }
  };

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

  const onClickVote = async event => {
    if (!schedules.selfAttendance) {
      console.log('이 일정이 만들어질 당시에는, 스터디에 가입하지 않았습니다');
    } else {
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
        getVote(schedules.selfAttendance.pk);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onClickDetailBtn = () => {
    setClick(!click);
  };

  const closeMenu = () => {
    setClick(!click);
  };

  const reVote = () => {
    setIsVoted(false);
  };

  useEffect(() => {
    // console.log('component did mount');
    if (!!schedules && !!schedules.selfAttendance) {
      getVote(schedules.selfAttendance.pk);
    }
  }, []);

  return (
    <>
      <StyledScheduleCard>
        <StyledCardTitle style={{ marginBottom: '1rem' }}>
          {schedules.subject}
        </StyledCardTitle>
        <StyledCardText>
          <StyledSmallIcon
            src="/static/icon-calendar.svg"
            alt="calendar icon"
          />
          {changeFormat(schedules.startAt, schedules.studyingTime)}
        </StyledCardText>
        <StyledCardText>
          <StyledSmallIcon
            src="/static/icon-location.svg"
            alt="calendar icon"
          />
          {schedules.location}
        </StyledCardText>
        <StyledCardText>
          <StyledSmallIcon
            src="/static/icon-check.svg"
            alt="check icon"
          />
          {changeFormat(schedules.voteEndAt)}
          &nbsp;까지
        </StyledCardText>

        {!isVoted &&
          schedules.selfAttendance &&
          !!schedules.selfAttendance.pk ? (
            <StyledAttendBtnContainer>
              <StyledAttendBtn
                onClick={onClickVote}
                data-vote="attend"
                data-pk={schedules.selfAttendance && schedules.selfAttendance.pk}
              >
                참석
              </StyledAttendBtn>
              <StyledAttendBtn
                onClick={onClickVote}
                data-vote="absent"
                data-pk={schedules.selfAttendance && schedules.selfAttendance.pk}
              >
                불참
              </StyledAttendBtn>
              <StyledAttendBtn
                onClick={onClickVote}
                data-vote="late"
                data-pk={schedules.selfAttendance && schedules.selfAttendance.pk}
              >
                지각
              </StyledAttendBtn>
            </StyledAttendBtnContainer>
          ) : schedules.selfAttendance && !!schedules.selfAttendance.pk ? (
            <StyledAttendBtnContainer>
              <StyledAttendText>
                <span>{expectAtt}</span>
                <span> 예정</span>
              </StyledAttendText>
              <StyledAttendBtn type="button" onClick={reVote}>
                다시 투표하기
              </StyledAttendBtn>
            </StyledAttendBtnContainer>
          ) : (
            <div>투표에 참여 할 수 없습니다.</div>
            )}
        {(role === 'manager' || role === 'sub_manager') && (
          <StyledDetailBtn type="button" onClick={onClickDetailBtn}>
            <img src="/static/icon-detail.svg" alt="detail icon" />
          </StyledDetailBtn>
        )}
      </StyledScheduleCard>

      <StyledDetailMenu show={click}>
        <StyledDetailItem>
          <Link
            route={`/editSchedule/${schedules.pk}`}
            href={`/editSchedule/${schedules.pk}`}
          >
            <a>
              <StyledLabel data-pk={schedules.pk}>
                <StyledIcon src="/static/icon-edit.svg" alt="edit icon" />
                일정 수정
              </StyledLabel>
            </a>
          </Link>
        </StyledDetailItem>
        <StyledDetailItem>
          <StyledLabel data-pk={schedules.pk} onClick={deleteSchedule}>
            <StyledIcon src="/static/icon-delete.svg" alt="delete icon" />
            일정 삭제
          </StyledLabel>
        </StyledDetailItem>
        <StyledDetailItem>
          <Link
            route={`/schedule/${schedules.pk}`}
            href={`/schedule/${schedules.pk}`}
          >
            <a>
              <StyledLabel>
                <StyledIcon
                  src="/static/icon-checkattend.svg"
                  alt="checkattend icon"
                />
                출결 관리
              </StyledLabel>
            </a>
          </Link>
        </StyledDetailItem>
        <StyledDetailItem onClick={closeMenu}>
          <StyledLabel>
            <StyledIcon src="/static/icon-close.svg" alt="close icon" />
            취소
          </StyledLabel>
        </StyledDetailItem>
      </StyledDetailMenu>
      <StyledBackground show={click} onClick={closeMenu} />
    </>
  );
};

ScheduleCard.propTypes = {
  schedules: PropTypes.object.isRequired,
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default ScheduleCard;
