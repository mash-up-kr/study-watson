import Axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Link } from '../../routes';

import { DELETE_SCHEDULE_REQUEST } from '../../reducers/schedule';
import { changeFormat } from '../../common/changeFormat';

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

const StyledAttendText = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  font-size: 0.8rem;
  span {
    color: #878d91;
  }
`;

const ScheduleCardBefore = ({ studyId,schedule, token, role = 'normal' }) => {
  console.log(schedule)
  const [click, setClick] = useState(false);
  const [attendance, setAttendance] = useState(
    !!schedule.selfAttendance && !!schedule.selfAttendance.pk ? schedule.selfAttendance.attDisplay : '이 일정이 만들어질 당시에는, 스터디에 가입하지 않았습니다',
  );

  const dispatch = useDispatch();

  const getAtt = useCallback(async id => {
    const { data } = await Axios.get(
      `https://study-watson.lhy.kr/api/v1/study/attendances/${id}/`,
    );

    setAttendance(data.attDisplay);
  });

  const deleteSchedule = useCallback(event => {
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
  });

  const onClickDetailBtn = useCallback(() => {
    setClick(!click);
  }, [click]);

  const closeMenu = useCallback(() => {
    setClick(!click);
  }, [click]);

  const startAt = useMemo(() => changeFormat(schedule.startAt), [])
  const voteEndAt = useMemo(() => changeFormat(schedule.voteEndAt), [])

  return (
    <>
      <StyledScheduleCard>
        <StyledCardTitle style={{ marginBottom: '1rem' }}>
          {schedule.subject}
        </StyledCardTitle>
        <StyledCardText>
          <img
            src="/static/icon-calendar.svg"
            alt="calendar icon"
            style={{ marginRight: '0.5rem' }}
          />
          {startAt}
        </StyledCardText>
        <StyledCardText>
          <img
            src="/static/icon-location.svg"
            alt="calendar icon"
            style={{ marginRight: '0.5rem' }}
          />
          {schedule.location}
        </StyledCardText>
        <StyledCardText>
          <img
            src="/static/icon-check.svg"
            alt="check icon"
            style={{ marginRight: '0.5rem' }}
          />
          {voteEndAt}
          &nbsp;까지
        </StyledCardText>

        <StyledAttendText>
          <span>{attendance}</span>
        </StyledAttendText>

        <StyledDetailBtn type="button" onClick={onClickDetailBtn}>
          <img src="/static/icon-detail.svg" alt="detail icon" />
        </StyledDetailBtn>
      </StyledScheduleCard>

      <StyledDetailMenu show={click}>
        <StyledDetailItem>
          <Link route={`/study/${studyId}/vote/${schedule.pk}`} href={`/study/${studyId}/vote/${schedule.pk}`}>
            <a>
              <StyledLabel>
                <StyledIcon
                  src="/static/icon-checkattend.svg"
                  alt="checkattend icon"
                />
                투표 현황
              </StyledLabel>
            </a>
          </Link>
        </StyledDetailItem>
        {(role === 'manager' || role === 'sub_manager') && (
          <>
            <StyledDetailItem>
              <Link
                route={`/study/${studyId}/editSchedule/${schedule.pk}`}
                href={`/study/${studyId}/editSchedule/${schedule.pk}`}
              >
                <a>
                  <StyledLabel data-pk={schedule.pk}>
                    <StyledIcon src="/static/icon-edit.svg" alt="edit icon" />
                    일정 수정
                  </StyledLabel>
                </a>
              </Link>
            </StyledDetailItem>
            <StyledDetailItem>
              <StyledLabel data-pk={schedule.pk} onClick={deleteSchedule}>
                <StyledIcon src="/static/icon-delete.svg" alt="delete icon" />
                일정 삭제
              </StyledLabel>
            </StyledDetailItem>
            <StyledDetailItem>
              <Link
                route={`/study/${studyId}/schedule/${schedule.pk}`}
                href={`/study/${studyId}/schedule/${schedule.pk}`}
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
          </>
        )}
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

ScheduleCardBefore.propTypes = {
  schedule: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default ScheduleCardBefore;
