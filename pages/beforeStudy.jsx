import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from '../containers/Header';
import ScheduleCardBefore from '../components/ScheduleCardBefore';
import { StyledTitle } from '../common/StyledComponents';
import checkLogin from '../common/checkLogin';
import redirect from '../common/redirect'

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  margin: auto;
`;

const ScheduleCardBeforeContainer = styled.div`
  margin-bottom: 1rem;
`;

const beforeStudy = ({ token, schedules, role,user }) => {

  return (
    <div>
      <Header user={user} />
      <StyledScreen>
        <StyledTitle>이전 스터디</StyledTitle>
        {schedules &&
          schedules.length > 0 &&
          schedules.map(schedule => {
            return (
              <ScheduleCardBeforeContainer key={schedule.pk}>
                <ScheduleCardBefore
                  schedule={schedule}
                  token={token}
                  role={role}
                />
              </ScheduleCardBeforeContainer>
            );
          })}
      </StyledScreen>
    </div>
  );
};

beforeStudy.getInitialProps = async ({ ctx, token, pk, res }) => {
  const user = await checkLogin({ res, token })
  const { studyId = 0 } = ctx.query;
  if (!studyId) {
    redirect({ res });
  }
  try {
    const result = await Promise.all([
      axios.get(
        `https://study-watson.lhy.kr/api/v1/study/schedules/?study=${studyId}`,
        { headers: { Authorization: `Token ${token}` } },
      ),
      axios.get(
        `https://study-watson.lhy.kr/api/v1/study/memberships/?user=${pk}&study=${studyId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      ),
    ])
    const schedules = result[0].data;

    const filterSchedules =
      schedules &&
      schedules.filter(schedule => {
        return schedule.startAt < new Date().toISOString();
      });

    const recentSchedules = [...filterSchedules];
    recentSchedules.sort((a, b) => {
      if (a.startAt < b.startAt) {
        return 1;
      }
      return -1;
    });

    return {
      schedules: recentSchedules,
      role: result[1].data[0].role,
      user,
      studyId,
      token,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

beforeStudy.propTypes = {
  schedules: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default beforeStudy;
