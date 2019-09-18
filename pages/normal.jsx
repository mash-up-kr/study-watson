import axios from 'axios'
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import Router from 'next/router';

import AuthorityManagementForm from '../components/AuthorityManagementForm';
import checkMember from '../common/checkMember';
import checkLogin from '../common/checkLogin';
import Header from '../containers/Header';
import redirect from '../common/redirect'

const Normal = ({ studyId, token, memberList: InitialMemberList, pk: userPK }) => {
  const [memberList, setMemberList] = useState(InitialMemberList)
  const text = '일반 유저 임명';
  const onClick = useCallback(async event => {
    const { pk } = event.target.dataset;
    try {
      const result = await axios.patch(
        `https://study-watson.lhy.kr/api/v1/study/memberships/${pk}/`,
        {
          role: 'normal',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      if (result.data.user.pk === parseInt(userPK, 10)) {
        Router.pushRoute(`/study/${studyId}`);
      }
      const filterMemberList = memberList.filter(membership => {
        return parseInt(membership.pk, 10) !== parseInt(pk, 10);
      });
      setMemberList([...filterMemberList]);
    } catch (error) {
      console.log(error);
    }
  }, [memberList]);
  return (
    <div style={{ margin: '8px' }}>
      <Header />
      <AuthorityManagementForm onClick={onClick} memberList={memberList} studyId={studyId} text={text} />
    </div>
  );
};

Normal.getInitialProps = async ({ ctx, token, res, pk }) => {
  const user = await checkLogin({ res, token })
  const { studyId } = ctx.query;
  if (!studyId) {
    redirect({ res });
  }
  const membership = await checkMember({ res, token, studyId, pk });
  if (membership.role !== 'manager' && membership.role !== 'sub_manager') {
    studyDetail({ res, studyId });
  }
  try {
    const result = await axios.get(`https://study-watson.lhy.kr/api/v1/study/${studyId}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const { membershipSet } = result.data;
    const memberList =
      (membershipSet &&
        membershipSet.length > 1)
        ? membershipSet.filter(membership => {
          return (
            membership.isWithdraw !== true &&
            membership.role !== 'manager' &&
            membership.role !== 'normal'
          );
        })
        : [];
    return {
      memberList,
      user,
      token,
      studyId,
      pk,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

Normal.propTypes = {
  memberList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  studyId: PropTypes.string.isRequired,
  pk: PropTypes.string.isRequired,
};

export default Normal;
