import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

import checkMember from '../common/checkMember'
import Header from '../containers/Header';
import checkLogin from '../common/checkLogin';
import redirect, { studyDetail } from '../common/redirect'
import EditForm from '../components/EditForm';

const editSchedule = ({ schedule, user }) => {
  return (
    <>
      <Header user={user} />
      <EditForm schedule={schedule} />
    </>
  );
};

editSchedule.getInitialProps = async ({ ctx, token, res, pk }) => {
  const user = await checkLogin({ res, token })
  const { studyId, scheduleId } = ctx.query;
  if (!scheduleId) {
    redirect({ res });
  }
  const membership = await checkMember({ res, token, studyId, pk });
  if (membership.role !== 'manager' && membership.role !== 'sub_manager') {
    studyDetail({ res, studyId });
  }
  try {
    const result = await axios.get(
      `https://study-watson.lhy.kr/api/v1/study/schedules/${scheduleId}/`,
      { headers: { Authorization: `Token ${token}` } },
    );
    return {
      schedule: result.data,
      user,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

editSchedule.propTypes = {
  user: PropTypes.object.isRequired,
  schedule: PropTypes.object.isRequired,
}

export default editSchedule;
