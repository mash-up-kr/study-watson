import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from '../containers/Header';
import { LOAD_SCHEDULES_REQUEST } from '../reducers/schedule';
import { LOAD_STUDY_MEMBERSHIPS_REQUEST } from '../reducers/study';
import ScheduleCard from '../components/ScheduleCard';
import { StyledTitle } from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  margin: auto;
`;

const ScheduleCardContainer = styled.div`
  margin-bottom: 1rem;
`;

const afterStudy = ({ studyId, token, pk: user }) => {
  const { schedules } = useSelector(state => state.schedule);
  const { role } = useSelector(state => state.study.memberships);

  const filterSchedules =
    schedules &&
    schedules.filter(schedule => {
      return schedule.startAt > new Date().toISOString();
    });

  const recentSchedules = [...filterSchedules];
  recentSchedules.sort((a, b) => {
    if (a.startAt > b.startAt) {
      return 1;
    }
    return -1;
  });

  return (
    <div>
      <Header />
      <StyledScreen>
        <StyledTitle>다가올 스터디</StyledTitle>
        {recentSchedules &&
          recentSchedules.length > 0 &&
          recentSchedules.map(schedule => {
            return (
              <ScheduleCardContainer key={schedule.pk}>
                <ScheduleCard
                  schedules={schedule}
                  studyId={studyId}
                  token={token}
                  user={user}
                  role={role}
                />
              </ScheduleCardContainer>
            );
          })}
      </StyledScreen>
    </div>
  );
};

afterStudy.getInitialProps = ({ ctx, token, pk }) => {
  const { studyId = 0 } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_SCHEDULES_REQUEST,
    data: {
      studyId,
      token,
    },
  });
  ctx.store.dispatch({
    type: LOAD_STUDY_MEMBERSHIPS_REQUEST,
    data: {
      studyId,
      pk,
      token,
    },
  });
  return {
    studyId,
    token,
    pk,
  };
};

afterStudy.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  pk: PropTypes.string.isRequired,
};

export default afterStudy;
