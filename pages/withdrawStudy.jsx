import axios from 'axios';
import React, { useCallback,useState } from 'react';
import PropTypes from 'prop-types';

import AuthorityManagementForm from '../components/AuthorityManagementForm';
import checkMember from '../common/checkMember';
import checkLogin from '../common/checkLogin';
import Header from '../components/Header';
import redirect from '../common/redirect'

const WithdrawStudy = ({ studyId, token, user, memberList: InitialMemberList }) => {
  const [memberList, setMemberList] = useState(InitialMemberList);
  const text = '제명';
  const onClick = useCallback(async event => {
    const { pk } = event.target.dataset;
    try {
      await axios.delete(
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
      const filterMemberList = memberList.filter(membership => {
        return JSON.stringify(membership.pk) === JSON.stringify(pk);
      });
      setMemberList(filterMemberList);
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

WithdrawStudy.getInitialProps = async ({ ctx, token, res, pk }) => {
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
    const { membershipSet } = result.data;
    const memberList =
      (membershipSet &&
        membershipSet.length > 0)
        ? membershipSet.filter(membership => {
          return membership.isWithdraw !== true && membership.role !== 'manager';
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

WithdrawStudy.propTypes = {
  memberList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  studyId: PropTypes.string.isRequired,
};

export default WithdrawStudy;
