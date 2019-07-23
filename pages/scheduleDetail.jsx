import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import Header from '../containers/Header';
import Attendance from '../components/Attendance';
import { Link } from '../routes';
import { LOAD_SCHEDULE_REQUEST } from '../reducers/schedule';

const ScheduleDetail = () => {
  const mount = useRef(null);
  const { schedule } = useSelector(state => state.schedule);
  const [attend, setAttend] = useState([]);
  const [late, setLate] = useState([]);
  const [absent, setAbsent] = useState([]);
  const [none, setNone] = useState([]);
  if (schedule.attendanceSet && schedule.attendanceSet.length > 0) {
    const attendList = [];
    const lateList = [];
    const absentList = [];
    const noneList = [];
    schedule.attendanceSet.forEach(attendance => {
      if (attendance.att === 'attend') {
        attendList.push(attendance);
      } else if (attendance.att === 'late') {
        lateList.push(attendance);
      } else if (attendance.att === 'absent') {
        absentList.push(attendance);
      } else {
        noneList.push(attendance);
      }
    });
    if (!mount.current) {
      mount.current = true;
      setAttend(attendList);
      setLate(lateList);
      setAbsent(absentList);
      setNone(noneList);
    }
  }

  const onClickAttendance = async event => {
    const { pk, user, attendance: att } = event.target.dataset;
    try {
      await Axios.patch(
        `https://study-watson.lhy.kr/api/v1/study/attendances/${pk}/`,
        {
          user,
          att,
        },
      );
      // Router.push(`/schedule/${scheduleId}`);
      const attendance =
        attend.find(Element => {
          return JSON.parse(Element.pk) === JSON.parse(pk);
        }) ||
        late.find(Element => {
          return JSON.parse(Element.pk) === JSON.parse(pk);
        }) ||
        absent.find(Element => {
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
      if (att === 'attend') {
        // eslint-disable-next-line no-shadow
        setAttend(attend => [...attend, attendance]);
      } else if (att === 'late') {
        // eslint-disable-next-line no-shadow
        setLate(late => [...late, attendance]);
      } else if (att === 'absent') {
        // eslint-disable-next-line no-shadow
        setAbsent(absent => [...absent, attendance]);
      } else {
        console.log('???');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <Link
        route={`/studyDetail/${schedule.study}`}
        href={`/studyDetail/${schedule.study}`}
      >
        <a>스터디로 가기</a>
      </Link>
      <div>
        <div>1.미정</div>
        {none.map(attendance => {
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
        <div>2.출석</div>
        {attend.map(attendance => {
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
        <div>3.지각</div>
        {late.map(attendance => {
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
        <div>4.결석</div>
        {absent.map(attendance => {
          return (
            <Attendance
              key={attendance.pk}
              attendance={attendance}
              onClickAttendance={onClickAttendance}
            />
          );
        })}
      </div>
    </div>
  );
};

ScheduleDetail.getInitialProps = ({ ctx, token }) => {
  const { scheduleId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_SCHEDULE_REQUEST,
    data: {
      scheduleId,
      token,
    },
  });
};

export default ScheduleDetail;
