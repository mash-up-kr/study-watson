import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '../containers/Header';
import checkLogin from '../common/checkLogin';
import redirect from '../common/redirect'
import ManagerForm from '../components/ManagerForm';

const Manager = ({ studyId, token, manager,memberList,user }) => {
  return (
    <div style={{ margin: '8px' }}>
      <Header user={user} />
      <ManagerForm manager={manager} memberList={memberList} token={token} studyId={studyId} />
    </div>
  );
};

Manager.getInitialProps = async ({ ctx, token, res }) => {
  const user = await checkLogin({ res, token })
  const { studyId } = ctx.query;
  if (!studyId) {
    redirect({ res });
  }
  try {
    const result = await axios.get(`https://study-watson.lhy.kr/api/v1/study/${studyId}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const { membershipSet } = result.data;
    const manager =
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
  manager: PropTypes.array.isRequired,
  memberList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  studyId: PropTypes.string.isRequired,
};

export default Manager;
