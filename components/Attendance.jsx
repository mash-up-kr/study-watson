import React from 'react';

import PropTypes from 'prop-types';

const Attendance = ({ attendance, onClickAttendance }) => {
  return (
    <div>
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
};

Attendance.propTypes = {
  attendance: PropTypes.object.isRequired,
  onClickAttendance: PropTypes.func.isRequired,
};

export default Attendance;
