import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from '../containers/Header';
import Attendance from '../components/Attendance';
import { LOAD_SCHEDULE_REQUEST } from '../reducers/schedule';
import { changeFormat } from '../common/changeFormat';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  margin: auto;
`;

const StyledLabel = styled.div`
  font-size: 0.9rem;
  color: #4d5256;
  padding: 1rem 0 0.5rem 0;
  border-bottom: 1px solid #ededed;
  margin-bottom: 1rem;
`;

const StyledTitle = styled.h1`
  width: 100%;
  font-size: 1.5rem;
  padding: 1.5rem 0 0.5rem 0;
  color: #4d5256;
`;

const StyledSubTitle = styled.div`
  font-size: 0.9rem;
  color: #878d91;
  margin-bottom: 1rem;
`;

const Vote = () => {
  const mount = useRef(null);
  const { schedule } = useSelector(state => state.schedule);
  const [attend, setAttend] = useState([]);
  const [late, setLate] = useState([]);
  const [absent, setAbsent] = useState([]);
  const [none, setNone] = useState([]);

  if (schedule.attendanceSet && schedule.attendanceSet.length > 0) {
    const attendList = [];
    const lateList = [];
    const absentList = [];
    const noneList = [];
    schedule.attendanceSet.forEach(attendance => {
      if (attendance.vote === 'attend') {
        attendList.push(attendance);
      } else if (attendance.vote === 'late') {
        lateList.push(attendance);
      } else if (attendance.vote === 'absent') {
        absentList.push(attendance);
      } else {
        noneList.push(attendance);
      }
    });
    if (!mount.current) {
      mount.current = true;
      setAttend(attendList);
      setLate(lateList);
      setAbsent(absentList);
      setNone(noneList);
    }
  }

  const attendCount = `출석 ${attend.length}`;
  const lateCount = `지각 ${late.length}`;
  const absentCount = `결석 ${absent.length}`;
  const noneCount = `미정 ${none.length}`;
  return (
    <>
      <Header />
      <StyledScreen>
        <StyledTitle>{schedule.subject}</StyledTitle>
        <StyledSubTitle>
          {!!schedule.startAt &&
            schedule.startAt.length > 0 &&
            changeFormat(schedule.startAt, schedule.studyingTime)}
        </StyledSubTitle>
        <div>
          <StyledLabel>{attendCount}</StyledLabel>
          {attend &&
            attend.length > 0 &&
            attend.map(attendance => {
              return <Attendance key={attendance.pk} attendance={attendance} />;
            })}
        </div>
        <div>
          <StyledLabel>{lateCount}</StyledLabel>
          {late &&
            late.length > 0 &&
            late.map(attendance => {
              return <Attendance key={attendance.pk} attendance={attendance} />;
            })}
        </div>
        <div>
          <StyledLabel>{absentCount}</StyledLabel>
          {absent &&
            absent.length > 0 &&
            absent.map(attendance => {
              return <Attendance key={attendance.pk} attendance={attendance} />;
            })}
        </div>
        <div>
          <StyledLabel>{noneCount}</StyledLabel>
          {none &&
            none.length > 0 &&
            none.map(attendance => {
              return <Attendance key={attendance.pk} attendance={attendance} />;
            })}
        </div>
      </StyledScreen>
    </>
  );
};

Vote.getInitialProps = ({ ctx, token }) => {
  const { scheduleId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_SCHEDULE_REQUEST,
    data: {
      scheduleId,
      token,
    },
  });
};

export default Vote;
