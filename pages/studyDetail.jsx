import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

import checkMember from '../common/checkMember';
import checkLogin from '../common/checkLogin';
import Header from '../containers/Header';
import StudyDetailForm from '../components/StudyDetailForm';
import redirect from '../common/redirect'

const studyDetail = ({ study, studyId, token, member, schedule, user }) => {
  return (
    <>
      <Header user={user} />
      <StudyDetailForm study={study} studyId={studyId} token={token} member={member} schedule={schedule} user={user} />
    </>
  );
};

studyDetail.getInitialProps = async ({ ctx, token, pk, res }) => {
  const user = await checkLogin({ res, token })
  const { studyId } = ctx.query;
  if (!studyId) {
    redirect({ res });
  }
  const member = await checkMember({res, token, studyId, pk});
  try {
    const result = await axios.get(
        `https://study-watson.lhy.kr/api/v1/study/schedules/?study=${studyId}`,
        { headers: { Authorization: `Token ${token}` } },
      );
    const schedules = result.data;
    const filterSchedules =
    schedules.length > 0
    ? schedules.filter(schedule => {
      return schedule.startAt > new Date().toISOString();
    })
    : [];

  const recentSchedules = [...filterSchedules];
  recentSchedules.sort((a, b) => {
    if (a.startAt > b.startAt) {
      return 1;
    }
    return -1;
  });

    return {
      schedule: recentSchedules[0] || {},
      member,
      user,
      studyId,
      token,
      study: member.study,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

studyDetail.propTypes = {
  study: PropTypes.object.isRequired,
  studyId: PropTypes.string.isRequired,
  schedule: PropTypes.object.isRequired,
  member: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default studyDetail;
