import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Router from 'next/router';

import AuthorityManagementForm from '../components/AuthorityManagementForm';
import checkMember from '../common/checkMember';
import checkLogin from '../common/checkLogin';
import Header from '../containers/Header';
import redirect, { studyDetail } from '../common/redirect'

const Manager = ({ studyId, token, manager, memberList, user }) => {
  const text = '리더 임명';
  const onClick = useCallback(async event => {
    try {
      await Promise.all([
        axios.patch(
          `https://study-watson.lhy.kr/api/v1/study/memberships/${
          event.target.dataset.pk
          }/`,
          {
            role: 'manager',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          },
        ),
        axios.patch(
          `https://study-watson.lhy.kr/api/v1/study/memberships/${
          manager.pk
          }/`,
          {
            role: 'sub_manager',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          },
        ),
      ])
    } catch (error) {
      console.log(error.response.data);
    }
    Router.pushRoute(`/study/${studyId}`);
  }, []);

  return (
    <div style={{ margin: '8px' }}>
      <Header user={user} />
      <AuthorityManagementForm onClick={onClick} memberList={memberList} studyId={studyId} text={text} />
    </div>
  );
};

Manager.getInitialProps = async ({ ctx, token, res, pk }) => {
  const user = await checkLogin({ res, token })
  const { studyId } = ctx.query;
  if (!studyId) {
    redirect({ res });
  }
  const membership = await checkMember({ res, token, studyId, pk });
  if (membership.role !== 'manager') {
    studyDetail({ res, studyId });
  }
  try {
    const result = await axios.get(`https://study-watson.lhy.kr/api/v1/study/${studyId}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const { membershipSet, author } = result.data;
    const managerList =
      (membershipSet &&
        membershipSet.length > 0)
        ? membershipSet.filter(membership => {
          return membership.role === 'manager';
        })
        : [];
    const memberList =
      (membershipSet &&
        membershipSet.length > 0)
        ? membershipSet.filter(membership => {
          return membership.isWithdraw !== true && membership.role !== 'manager';
        })
        : [];
    const manager = managerList[0]
    if(manager.user.pk !== parseInt(pk,10)) {
      studyDetail({res, studyId})
    }
    return {
      manager,
      memberList,
      user,
      token,
      studyId,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

Manager.propTypes = {
  manager: PropTypes.object.isRequired,
  memberList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  studyId: PropTypes.string.isRequired,
};

export default Manager;
