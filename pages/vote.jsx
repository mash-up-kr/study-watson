import axios from 'axios';
import PropTypes from 'prop-types';
import React  from 'react';
import styled from 'styled-components';


import Attendance from '../components/Attendance';
import { changeFormat } from '../common/changeFormat';
import checkMember from '../common/checkMember';
import checkLogin from '../common/checkLogin';
import Header from '../containers/Header';
import redirect from '../common/redirect'
import VoteForm from '../components/VoteForm';

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

const Vote = ({ schedule, attendList, lateList, absentList, noneList, user }) => {
  return (
    <>
      <Header user={user} />
      <VoteForm schedule={schedule} attendList={attendList} lateList={lateList} absentList={absentList} noneList={noneList} />
    </>
  );
};

Vote.getInitialProps = async ({ ctx, token, res, pk }) => {
  const user = await checkLogin({ res, token })
  const { studyId, scheduleId } = ctx.query;
  if (!scheduleId) {
    redirect({ res });
  }
  const membership = await checkMember({ res, token, studyId, pk });
  if (membership.role !== 'manager' && membership.role !== 'sub_manager') {
    studyDetail({ res, studyId });
  }
  try {
    const result = await axios.get(
      `https://study-watson.lhy.kr/api/v1/study/schedules/${scheduleId}/`,
      { headers: { Authorization: `Token ${token}` } },
    );
    const schedule = result.data;
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
    return {
      schedule: result.data,
      attendList,
      lateList,
      absentList,
      noneList,
      user,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

Vote.propTypes = {
  user: PropTypes.object.isRequired,
  schedule: PropTypes.object.isRequired,
  attendList: PropTypes.array.isRequired,
  lateList: PropTypes.array.isRequired,
  absentList: PropTypes.array.isRequired,
  noneList: PropTypes.array.isRequired,
}

export default Vote;
