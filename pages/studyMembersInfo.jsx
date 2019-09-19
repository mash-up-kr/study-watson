import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import checkMember from '../common/checkMember';
import checkLogin from '../common/checkLogin';
import Header from '../containers/Header';
import redirect from '../common/redirect'
import MemberSettingBtn from '../components/MemberSettingBtn';
import MemberListItem from '../components/MemberListItem';
import { StyledTitle } from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100vw - 2rem);
  margin: auto;
  padding-bottom: 2rem;
`;

const StudyMembersInfo = ({ studyId, memberList, role, user }) => {
  const totalMember = `총 ${memberList.length}명의 참여자`;

  return (
    <>
      <Header user={user} />
      <StyledScreen>
        <StyledTitle>{totalMember}</StyledTitle>
        {memberList.map(membership => {
          return (
            <MemberListItem key={membership.pk} membership={membership} />
          );
        })}
        {(role === 'manager' || role === 'sub_manager') && (
          <MemberSettingBtn studyId={studyId} role={role} />
        )}
      </StyledScreen>
    </>
  );
};

StudyMembersInfo.getInitialProps = async ({ ctx, token, res, pk }) => {
  const user = await checkLogin({ res, token })
  const { studyId } = ctx.query;
  if (!studyId) {
    redirect({ res });
  }
  const member = await checkMember({ res, token, studyId, pk });
  try {
    const result = await axios.get(`https://study-watson.lhy.kr/api/v1/study/${studyId}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const { membershipSet } = result.data;
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
      studyId,
      memberList,
      user,
      role: member.role,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

StudyMembersInfo.propTypes = {
  studyId: PropTypes.string.isRequired,
  memberList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
};

export default StudyMembersInfo;

