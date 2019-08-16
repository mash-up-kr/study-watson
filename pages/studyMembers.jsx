import React from 'react';
import { useSelector } from 'react-redux';

import { LOAD_STUDY_REQUEST } from '../reducers/study';
import Header from '../containers/Header';

const StudyMembers = () => {
  const { membershipSet } = useSelector(state => state.study.study);
  return (
    <div>
      <Header />
      <div>
        {membershipSet &&
          membershipSet.map(membership => {
            let attend = 0;
            let late = 0;
            let absent = 0;
            membership.attendanceSet.forEach(attendance => {
              if (attendance.att === 'attend') {
                attend += 1;
              } else if (attendance.att === 'late') {
                late += 1;
              } else if (attendance.att === 'absent') {
                absent += 1;
              }
            });
            return (
              <div key={membership.pk}>
                <div>{membership.user.nickname}</div>
                <div>
                  <div>참석</div>
                  <div>{attend}</div>
                </div>
                <div>
                  <div>지각</div>
                  <div>{late}</div>
                </div>
                <div>
                  <div>결석</div>
                  <div>{absent}</div>
                </div>

                <div>
                  {membership.attendanceSet &&
                    membership.attendanceSet.length > 0 &&
                    membership.attendanceSet.map(attendance => {
                      return (
                        <div key={attendance.pk}>
                          <div>{attendance.schedule.startAt}</div>
                          <div>{attendance.attDisplay || '미정'}</div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

StudyMembers.getInitialProps = ({ ctx, token }) => {
  const { studyId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_STUDY_REQUEST,
    data: { token, studyId },
  });
  // return { studyId };
};

export default StudyMembers;
