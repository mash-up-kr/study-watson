import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Axios from 'axios';
import { LOAD_STUDY_REQUEST } from '../reducers/study';
import Header from '../containers/Header';
import { Link } from '../routes';

const WithdrawStudy = ({ studyId, token }) => {
  const { membershipSet } = useSelector(state => state.study.study);
  const [memberList, setMemberList] = useState([]);
  const mount = useRef(null);
  if (!mount.current) {
    mount.current = true;
    const filterMemberList =
      membershipSet &&
      membershipSet.length > 0 &&
      membershipSet.filter(membership => {
        return membership.isWithdraw !== true && membership.role !== 'manager';
      });
    setMemberList(filterMemberList);
  }
  const onClick = async event => {
    const { pk } = event.target.dataset;
    try {
      await Axios.delete(
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
      const filterMemberList = membershipSet.filter(membership => {
        return JSON.stringify(membership.pk) === JSON.stringify(pk);
      });
      setMemberList(filterMemberList);
    } catch (error) {
      console.log(error);
      if (error) {
        console.log(error.response);
      }
    }
  };
  return (
    <div>
      <Header />
      <div>
        <div>
          <Link
            route={`/studyDetail/${studyId}`}
            href={`/studyDetail/${studyId}`}
          >
            <a>스터디로 돌아가기</a>
          </Link>
        </div>
        {memberList &&
          memberList.map(membership => {
            return (
              <div key={membership.pk}>
                {membership.user.imgProfile && (
                  <img
                    src={membership.user.imgProfile}
                    alt=""
                    style={{ width: '50px' }}
                  />
                )}
                <div>
                  <div>nickname</div>
                  <div>{membership.user.nickname || membership.user.email}</div>
                </div>
                {membership.user.name && (
                  <div>
                    <div>name</div>
                    <div>{membership.user.name}</div>
                  </div>
                )}
                {membership.user.email && (
                  <div>
                    <div>email</div>
                    <div>{membership.user.email}</div>
                  </div>
                )}
                {membership.user.phoneNumber && (
                  <div>
                    <div>phoneNumber</div>
                    <div>{membership.user.phoneNumber}</div>
                  </div>
                )}
                {membership.roleDisplay && (
                  <div>
                    <div>roleDisplay</div>
                    <div>{membership.roleDisplay}</div>
                  </div>
                )}
                <div data-pk={membership.pk} onClick={onClick}>
                  제명
                </div>
                <hr />
              </div>
            );
          })}
      </div>
    </div>
  );
};

WithdrawStudy.getInitialProps = ({ ctx, token }) => {
  const { studyId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_STUDY_REQUEST,
    data: { token, studyId },
  });
  return { studyId, token };
};

WithdrawStudy.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default WithdrawStudy;
