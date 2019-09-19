import axios from 'axios'
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import checkMember from '../common/checkMember';
import checkLogin from '../common/checkLogin';
import Header from '../components/Header';
import redirect from '../common/redirect'
import MemberAttendanceItem from '../components/MemberAttendanceItem';
import { StyledTitle } from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100vw - 2rem);
  margin: auto;
  padding-bottom: 2rem;
`;

const StudyMembers = ({ memberList, scheduleCount, user }) => {
  const title = `총 ${scheduleCount}번의 스터디 모임`;
  return (
    <>
      <Header user={user} />
      <StyledScreen>
        <StyledTitle>{title}</StyledTitle>
        {memberList &&
          memberList.map(membership => {
            let attend = 0;
            let late = 0;
            let absent = 0;
            membership.attendanceSet.forEach(attendance => {
              if (attendance.att === 'attend') {
                attend += 1;
              } else if (attendance.att === 'late') {
                late += 1;
              } else if (attendance.att === 'absent') {
                absent += 1;
              }
            });
            const attendCount = `참석 ${attend} · 지각 ${late} · 결석 ${absent}`;
            return (
              <MemberAttendanceItem
                key={membership.pk}
                membership={membership}
                attendCount={attendCount}
              />
            );
          })}
      </StyledScreen>
    </>
  );
};

StudyMembers.getInitialProps = async ({ ctx, token, res, pk }) => {
  const user = await checkLogin({ res, token })
  const { studyId } = ctx.query;
  if (!studyId) {
    redirect({ res });
  }
  await checkMember({ res, token, studyId, pk });
  try {
    const result = await axios.get(`https://study-watson.lhy.kr/api/v1/study/${studyId}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const { membershipSet, scheduleSet } = result.data;
    const filterMemberList = membershipSet.filter(membership => {
      return membership.isWithdraw !== true;
    });
    const sortMember = filterMemberList.sort((a, b) => {
      return a.user.nickname > b.user.nickname;
    });
    const normalMemeber = sortMember.filter(member => {
      return member.role === 'normal';
    });
    const subManagerMember = sortMember.filter(member => {
      return member.role === 'sub_manager';
    });
    const managerMember = sortMember.filter(member => {
      return member.role === 'manager';
    });
    const memberList = [
      ...managerMember,
      ...subManagerMember,
      ...normalMemeber,
    ];
    return {
      scheduleCount: scheduleSet.length,
      memberList,
      user,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

StudyMembers.propTypes = {
  scheduleCount: PropTypes.number.isRequired,
  memberList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default StudyMembers;
