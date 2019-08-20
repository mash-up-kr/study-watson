import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LOAD_STUDY_REQUEST } from '../reducers/study';
import Header from '../containers/Header';
import MemberListItem from '../components/MemberListItem';
import { Link } from '../routes';
import { StyledTitle } from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100vw - 2rem);
  margin: auto;
  padding-bottom: 2rem;
`;

const studyMembersInfo = ({ studyId }) => {
  const { membershipSet } = useSelector(state => state.study.study);
  const [sortMembershipSet, setSortMembershipSet] = useState(membershipSet);

  useEffect(() => {
    if (membershipSet.length > 0) {
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

  const totalMember = `총 ${sortMembershipSet.length}명의 참여자`;

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

        <div>
          <div>
            <div>
              <Link route={`/manager/${studyId}`} href={`/manager/${studyId}`}>
                <a>리더 임명</a>
              </Link>
            </div>
            <div>
              <Link
                route={`/subManager/${studyId}`}
                href={`/subManager/${studyId}`}
              >
                <a>임시 리더 임명</a>
              </Link>
            </div>
            <div>
              <Link route={`/normal/${studyId}`} href={`/normal/${studyId}`}>
                <a>일반 유저</a>
              </Link>
            </div>
            <div>
              <Link
                route={`/withdrawStudy/${studyId}`}
                href={`/withdrawStudy/${studyId}`}
              >
                <a>제명</a>
              </Link>
            </div>
          </div>
        </div>
      </StyledScreen>
    </>
  );
};

studyMembersInfo.getInitialProps = ({ ctx, token }) => {
  const { studyId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_STUDY_REQUEST,
    data: { token, studyId },
  });
  return { studyId };
};

studyMembersInfo.propTypes = {
  studyId: PropTypes.string.isRequired,
};

export default studyMembersInfo;
