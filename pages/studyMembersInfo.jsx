import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { LOAD_STUDY_REQUEST } from '../reducers/study';
import Header from '../containers/Header';
import { Link } from '../routes';

const studyMembersInfo = ({ studyId }) => {
  const { membershipSet } = useSelector(state => state.study.study);
  const [memberList, setMemberList] = useState([]);
  const mount = useRef(null);
  if (!mount.current) {
    mount.current = true;
    const filterMemberList =
      membershipSet &&
      membershipSet.length > 0 &&
      membershipSet.filter(membership => {
        return membership.isWithdraw !== true;
      });
    setMemberList(filterMemberList);
  }
  return (
    <div>
      <Header />
      <div>
        <div>
          <div>
            <Link
              route={`/studyDetail/${studyId}`}
              href={`/studyDetail/${studyId}`}
            >
              <a>스터디로 돌아가기</a>
            </Link>
          </div>
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
                <hr />
              </div>
            );
          })}
      </div>
    </div>
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
