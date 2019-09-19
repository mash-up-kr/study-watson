import PropTypes from 'prop-types';
import React  from 'react';
import styled from 'styled-components';


import Attendance from '../components/Attendance';
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

const VoteForm = ({ schedule, attendList, lateList, absentList, noneList }) => {
  const attendCount = `출석 ${attendList.length}`;
  const lateCount = `지각 ${lateList.length}`;
  const absentCount = `결석 ${absentList.length}`;
  const noneCount = `미정 ${noneList.length}`;
  return (
      <StyledScreen>
        <StyledTitle>{schedule.subject}</StyledTitle>
        <StyledSubTitle>
          {!!schedule.startAt &&
            schedule.startAt.length > 0 &&
            changeFormat(schedule.startAt, schedule.studyingTime)}
        </StyledSubTitle>
        <div>
          <StyledLabel>{attendCount}</StyledLabel>
          {attendList &&
            attendList.length > 0 &&
            attendList.map(attendance => {
              return <Attendance key={attendance.pk} attendance={attendance} />;
            })}
        </div>
        <div>
          <StyledLabel>{lateCount}</StyledLabel>
          {lateList &&
            lateList.length > 0 &&
            lateList.map(attendance => {
              return <Attendance key={attendance.pk} attendance={attendance} />;
            })}
        </div>
        <div>
          <StyledLabel>{absentCount}</StyledLabel>
          {absentList &&
            absentList.length > 0 &&
            absentList.map(attendance => {
              return <Attendance key={attendance.pk} attendance={attendance} />;
            })}
        </div>
        <div>
          <StyledLabel>{noneCount}</StyledLabel>
          {noneList &&
            noneList.length > 0 &&
            noneList.map(attendance => {
              return <Attendance key={attendance.pk} attendance={attendance} />;
            })}
        </div>
      </StyledScreen>
  );
};


VoteForm.propTypes = {
  schedule: PropTypes.object.isRequired,
  attendList: PropTypes.array.isRequired,
  lateList: PropTypes.array.isRequired,
  absentList: PropTypes.array.isRequired,
  noneList: PropTypes.array.isRequired,
}

export default VoteForm;
