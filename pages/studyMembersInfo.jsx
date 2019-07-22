import React from 'react';
import { useSelector } from 'react-redux';

import { LOAD_STUDY_REQUEST } from '../reducers/study';
import Header from '../containers/Header';

const studyMembersInfo = () => {
  const { membershipSet } = useSelector(state => state.study.study);
  const { study } = useSelector(state => state.study);
  console.log(111, study);
  return (
    <div>
      <Header />
      <div>
        {membershipSet &&
          membershipSet.map(membership => {
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
  // return { studyId };
};

export default studyMembersInfo;
