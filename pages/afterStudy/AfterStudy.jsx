import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import checkMember from '../../common/checkMember';
import checkLogin from '../../common/checkLogin';
import Header from '../../components/Header';
import ScheduleCard from '../../components/ScheduleCard';
import { StyledTitle } from '../../common/StyledComponents';
import redirect from '../../common/redirect'

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  margin: auto;
`;

const ScheduleCardContainer = styled.div`
  margin-bottom: 1rem;
`;

const AfterStudy = ({ studyId, token, pk: userPK, user, schedules, role }) => {
  return (
    <div>
      <Header user={user} />
      <StyledScreen>
        <StyledTitle>다가올 스터디</StyledTitle>
        {schedules &&
          schedules.length > 0 &&
          schedules.map(schedule => {
            return (
              <ScheduleCardContainer key={schedule.pk}>
                <ScheduleCard
                  studyId={studyId}
                  schedule={schedule}
                  token={token}
                  user={userPK}
                  role={role}
                />
              </ScheduleCardContainer>
            );
          })}
      </StyledScreen>
    </div>
  );
};

AfterStudy.getInitialProps = async ({ ctx, token, pk, res }) => {
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

    return {
      schedules: recentSchedules,
      role: member.role,
      user,
      studyId,
      token,
      pk,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

AfterStudy.propTypes = {
  schedules: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  pk: PropTypes.string.isRequired,
};

export default AfterStudy;
