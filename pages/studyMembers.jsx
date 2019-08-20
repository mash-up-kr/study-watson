import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { LOAD_STUDY_REQUEST } from '../reducers/study';
import Header from '../containers/Header';
import MemberAttendanceItem from '../components/MemberAttendanceItem';
import { StyledTitle } from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100vw - 2rem);
  margin: auto;
  padding-bottom: 2rem;
`;

const StudyMembers = () => {
  const { membershipSet } = useSelector(state => state.study.study);
  const { scheduleSet } = useSelector(state => state.study.study);
  const number = scheduleSet && scheduleSet.length > 0 ? scheduleSet.length : 0;
  const title = `총 ${number}번의 스터디 모임`;
  const [sortMembershipSet, setSortMembershipSet] = useState(membershipSet);

  useEffect(() => {
    if (!!membershipSet && membershipSet.length > 0) {
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
      const resultMember = [
        ...managerMember,
        ...subManagerMember,
        ...normalMemeber,
      ];
      setSortMembershipSet(resultMember);
    }
  }, [membershipSet]);

  return (
    <>
      <Header />
      <StyledScreen>
        <StyledTitle>{title}</StyledTitle>
        {sortMembershipSet &&
          sortMembershipSet.map(membership => {
            return (
              <MemberAttendanceItem
                key={membership.pk}
                membership={membership}
              />
            );
          })}
      </StyledScreen>
    </>
  );
};

StudyMembers.getInitialProps = ({ ctx, token }) => {
  const { studyId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_STUDY_REQUEST,
    data: { token, studyId },
  });
  // return { studyId };
};

export default StudyMembers;
