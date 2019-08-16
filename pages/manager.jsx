import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Axios from 'axios';
import { LOAD_STUDY_REQUEST } from '../reducers/study';
import Header from '../containers/Header';
import { Link } from '../routes';

const Manager = ({ studyId, token }) => {
  const { membershipSet } = useSelector(state => state.study.study);
  const manager =
    membershipSet &&
    membershipSet.length > 0 &&
    membershipSet.filter(membership => {
      return membership.role === 'manager';
    });
  const memberList =
    membershipSet &&
    membershipSet.length > 0 &&
    membershipSet.filter(membership => {
      return membership.isWithdraw !== true && membership.role !== 'manager';
    });
  const onClick = async event => {
    try {
      await Axios.patch(
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
      );
      await Axios.patch(
        `https://study-watson.lhy.kr/api/v1/study/memberships/${
          manager[0].pk
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
      );
    } catch (error) {
      console.log(error);
    }
    Router.push(`/studyDetail/${studyId}`);
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
                  리더 임명
                </div>
                <hr />
              </div>
            );
          })}
      </div>
    </div>
  );
};

Manager.getInitialProps = ({ ctx, token }) => {
  const { studyId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_STUDY_REQUEST,
    data: { token, studyId },
  });
  return { studyId, token };
};

Manager.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default Manager;
