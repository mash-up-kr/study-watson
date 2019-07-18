import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Axios from 'axios';
import { LOAD_SCHEDULE_REQUEST } from '../reducers/schedule';

const scheduleDetail = ({ scheduleId }) => {
  const { schedule } = useSelector(state => state.schedule);
  const attend = [];
  const late = [];
  const absent = [];
  const none = [];
  if (schedule.attendanceSet && schedule.attendanceSet.length > 0) {
    schedule.attendanceSet.forEach(attendance => {
      if (attendance.att === 'attend') {
        attend.push(attendance);
      } else if (attendance.att === 'late') {
        late.push(attendance);
      } else if (attendance.att === 'absent') {
        absent.push(attendance);
      } else {
        none.push(attendance);
      }
    });
  }

  const onClickAttendance = async event => {
    try {
      await Axios.patch(
        `https://study-watson.lhy.kr/api/v1/study/attendances/${
          event.target.dataset.pk
        }/`,
        {
          user: event.target.dataset.user,
          att: event.target.dataset.attendance,
        },
      );
      Router.push(`/schedule/${scheduleId}`);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <div>
        <div>1.미정</div>
        {none.map(attendance => {
          return (
            <div key={attendance.pk}>
              <div>{attendance.user.nickname}</div>
              <div
                data-pk={attendance.pk}
                data-user={attendance.user.pk}
                data-attendance="attend"
                onClick={onClickAttendance}
              >
                출석
              </div>
              <div
                data-pk={attendance.pk}
                data-user={attendance.user.pk}
                data-attendance="late"
                onClick={onClickAttendance}
              >
                지각
              </div>
              <div
                data-pk={attendance.pk}
                data-user={attendance.user.pk}
                data-attendance="absent"
                onClick={onClickAttendance}
              >
                결석
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div>2.출석</div>
        {attend.map(attendance => {
          return (
            <div key={attendance.pk}>
              <div>{attendance.user.nickname}</div>
              <div
                data-pk={attendance.pk}
                data-user={attendance.user.pk}
                data-attendance="attend"
                onClick={onClickAttendance}
              >
                출석
              </div>
              <div
                data-pk={attendance.pk}
                data-user={attendance.user.pk}
                data-attendance="late"
                onClick={onClickAttendance}
              >
                지각
              </div>
              <div
                data-pk={attendance.pk}
                data-user={attendance.user.pk}
                data-attendance="absent"
                onClick={onClickAttendance}
              >
                결석
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div>3.지각</div>
        {late.map(attendance => {
          return (
            <div key={attendance.pk}>
              <div>{attendance.user.nickname}</div>
              <div
                data-pk={attendance.pk}
                data-user={attendance.user.pk}
                data-attendance="attend"
                onClick={onClickAttendance}
              >
                출석
              </div>
              <div
                data-pk={attendance.pk}
                data-user={attendance.user.pk}
                data-attendance="late"
                onClick={onClickAttendance}
              >
                지각
              </div>
              <div
                data-pk={attendance.pk}
                data-user={attendance.user.pk}
                data-attendance="absent"
                onClick={onClickAttendance}
              >
                결석
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div>4.결석</div>
        {absent.map(attendance => {
          return (
            <div key={attendance.pk}>
              <div>{attendance.user.nickname}</div>
              <div
                data-pk={attendance.pk}
                data-attendance="attend"
                onClick={onClickAttendance}
              >
                출석
              </div>
              <div
                data-pk={attendance.pk}
                data-attendance="late"
                onClick={onClickAttendance}
              >
                지각
              </div>
              <div
                data-pk={attendance.pk}
                data-attendance="absent"
                onClick={onClickAttendance}
              >
                결석
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

scheduleDetail.getInitialProps = ({ ctx, token }) => {
  const { scheduleId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_SCHEDULE_REQUEST,
    data: {
      scheduleId,
      token,
    },
  });
  return { scheduleId };
};

scheduleDetail.propTypes = {
  scheduleId: PropTypes.string.isRequired,
};

export default scheduleDetail;
