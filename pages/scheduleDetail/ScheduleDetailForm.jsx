import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Attendance from '../../components/Attendance';
import { changeFormat } from '../../common/changeFormat';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  margin: auto;
`;

const StyledLabel = styled.div`
  font-size: 0.9rem;
  color: #4d5256;
  padding: 1rem 0 0.5rem 0;
  border-bottom: 1px solid #ededed;
  margin-bottom: 1rem;
`;

const StyledTitle = styled.h1`
  width: 100%;
  font-size: 1.5rem;
  padding: 1.5rem 0 0.5rem 0;
  color: #4d5256;
`;

const StyledSubTitle = styled.div`
  font-size: 0.9rem;
  color: #878d91;
  margin-bottom: 1rem;
`;

const ScheduleDetailForm = ({ schedule, attendList, lateList, absentList, noneList }) => {
  const [attend, setAttend] = useState(attendList);
  const [late, setLate] = useState(lateList);
  const [absent, setAbsent] = useState(absentList);
  const [none, setNone] = useState(noneList);

  const onClickAttendance = useCallback(async event => {
    const { pk, user, attendance: att } = event.target.dataset;
    try {
      await axios.patch(
        `https://study-watson.lhy.kr/api/v1/study/attendances/${pk}/`,
        {
          user,
          att,
        },
      );
      const attendance =
        attend.find(Element => {
          return JSON.parse(Element.pk) === JSON.parse(pk);
        }) ||
        late.find(Element => {
          return JSON.parse(Element.pk) === JSON.parse(pk);
        }) ||
        absent.find(Element => {
          return JSON.parse(Element.pk) === JSON.parse(pk);
        }) ||
        none.find(Element => {
          return JSON.parse(Element.pk) === JSON.parse(pk);
        });
      const filterAttend = attend.filter(Element => {
        return JSON.parse(Element.pk) !== JSON.parse(pk);
      });
      setAttend(filterAttend);
      const filterLate = late.filter(Element => {
        return JSON.parse(Element.pk) !== JSON.parse(pk);
      });
      setLate(filterLate);
      const filterAbsent = absent.filter(Element => {
        return JSON.parse(Element.pk) !== JSON.parse(pk);
      });
      setAbsent(filterAbsent);
      const filterNone = none.filter(Element => {
        return JSON.parse(Element.pk) !== JSON.parse(pk);
      });
      setNone(filterNone);
      if (att === 'attend') {
        if (!!attendance && !!attendance.pk) {
          // eslint-disable-next-line no-shadow
          setAttend(attend => [...attend, attendance]);
        }
      } else if (att === 'late') {
        if (!!attendance && !!attendance.pk) {
          // eslint-disable-next-line no-shadow
          setLate(late => [...late, attendance]);
        }
      } else if (att === 'absent') {
        if (!!attendance && !!attendance.pk) {
          // eslint-disable-next-line no-shadow
          setAbsent(absent => [...absent, attendance]);
        }
      } else {
        console.log('???');
      }
    } catch (error) {
      console.log(error.response);
    }
  }, [attend, late, absent, none]);
  
  const attendCount = `출석 ${attend.length}`
  const lateCount = `지각 ${late.length}`
  const absentCount = `결석 ${absent.length}`
  const noneCount = `미정 ${none.length}`

  return (
      <StyledScreen>
        <StyledTitle>{schedule.subject}</StyledTitle>
        <StyledSubTitle>
          {!!schedule.startAt &&
            schedule.startAt.length > 0 &&
            changeFormat(schedule.startAt, schedule.studyingTime)}
        </StyledSubTitle>
        <div>
          <StyledLabel>{attendCount}</StyledLabel>
          {attend &&
            attend.length > 0 &&
            attend.map(attendance => {
              return (
                <Attendance
                  key={attendance.pk}
                  attendance={attendance}
                  onClickAttendance={onClickAttendance}
                />
              );
            })}
        </div>
        <div>
          <StyledLabel>{lateCount}</StyledLabel>
          {late &&
            late.length > 0 &&
            late.map(attendance => {
              return (
                <Attendance
                  key={attendance.pk}
                  attendance={attendance}
                  onClickAttendance={onClickAttendance}
                />
              );
            })}
        </div>
        <div>
          <StyledLabel>{absentCount}</StyledLabel>
          {absent &&
            absent.length > 0 &&
            absent.map(attendance => {
              return (
                <Attendance
                  key={attendance.pk}
                  attendance={attendance}
                  onClickAttendance={onClickAttendance}
                />
              );
            })}
        </div>
        <div>
          <StyledLabel>{noneCount}</StyledLabel>
          {none &&
            none.length > 0 &&
            none.map(attendance => {
              return (
                <Attendance
                  key={attendance.pk}
                  attendance={attendance}
                  onClickAttendance={onClickAttendance}
                />
              );
            })}
        </div>
      </StyledScreen>
  );
};


ScheduleDetailForm.propTypes = {
  schedule: PropTypes.object.isRequired,
  attendList: PropTypes.array.isRequired,
  lateList: PropTypes.array.isRequired,
  absentList: PropTypes.array.isRequired,
  noneList: PropTypes.array.isRequired,
}

export default ScheduleDetailForm;
