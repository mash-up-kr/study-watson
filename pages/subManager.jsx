import axios from 'axios'
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

import AuthorityManagementForm from '../components/AuthorityManagementForm';
import checkMember from '../common/checkMember';
import checkLogin from '../common/checkLogin';
import Header from '../components/Header';
import redirect from '../common/redirect'


const SubManager = ({ studyId, token, memberList: InitialMemberList, user }) => {
  const [memberList, setMemberList] = useState(InitialMemberList);
  const text = '서브 리더 임명';
  const onClick =  useCallback(async event => {
    const { pk } = event.target.dataset;
    try {
      await axios.patch(
        `https://study-watson.lhy.kr/api/v1/study/memberships/${pk}/`,
        {
          role: 'sub_manager',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      const filterMemberList = memberList.filter(membership => {
        return parseInt(membership.pk, 10) !== parseInt(pk, 10);
      });
      setMemberList([...filterMemberList]);
    } catch (error) {
      console.log(error);
      if (error) {
        console.log(error.response);
      }
    }
  }, [memberList]);
  return (
    <div style={{ margin: '8px' }}>
      <Header user={user} />
      <AuthorityManagementForm onClick={onClick} memberList={memberList} studyId={studyId} text={text} />
    </div>
  );
};

SubManager.getInitialProps = async ({ ctx, token, res, pk }) => {
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
      membershipSet.length > 0) 
      ? membershipSet.filter(membership => {
        return (
          membership.isWithdraw !== true &&
          membership.role !== 'manager' &&
          membership.role !== 'sub_manager'
        );
      })
      : [];
    return {
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

SubManager.propTypes = {
  memberList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  studyId: PropTypes.string.isRequired,
};

export default SubManager;
