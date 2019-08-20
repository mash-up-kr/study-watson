import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { LOAD_STUDY_REQUEST, LOAD_STUDY_MEMBERSHIPS_REQUEST } from '../reducers/study';
import Header from '../containers/Header';
import MemberSettingBtn from '../components/MemberSettingBtn';
import MemberListItem from '../components/MemberListItem';
import { StyledTitle } from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100vw - 2rem);
  margin: auto;
  padding-bottom: 2rem;
`;

const studyMembersInfo = ({ studyId }) => {
  const { membershipSet } = useSelector(state => state.study.study);
  const { role } = useSelector(
    state => state.study.memberships,
  );
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
    // }
  }, [membershipSet]);

  const totalMember = `총 ${!!sortMembershipSet &&
    sortMembershipSet.length}명의 참여자`;

  return (
    <>
      <Header />
      <StyledScreen>
        <StyledTitle>{totalMember}</StyledTitle>
        {!!sortMembershipSet &&
          sortMembershipSet.map(membership => {
            return (
              <MemberListItem key={membership.pk} membership={membership} />
            );
          })}

        {(role === 'manager' || role === 'sub_manager') && (
          <MemberSettingBtn studyId={studyId} />
        )}
      </StyledScreen>
    </>
  );
};

studyMembersInfo.getInitialProps = ({ ctx, token, pk }) => {
  const { studyId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_STUDY_REQUEST,
    data: { token, studyId },
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

studyMembersInfo.propTypes = {
  studyId: PropTypes.string.isRequired,
};

export default studyMembersInfo;
