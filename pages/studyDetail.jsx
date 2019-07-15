import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';

import Axios from 'axios';
import Header from '../containers/Header';
import { Link } from '../routes';

const studyDetail = ({ studyId, memberId, token }) => {
  const [schedules, setSchedules] = useState([]);
  const getSchedule = async () => {
    const result = await Axios.get(
      `https://study-watson.lhy.kr/api/v1/study/schedules/?study=${studyId}`,
      { headers: { Authorization: `Token ${token}` } },
    );
    setSchedules(result.data);
    console.log(result);
  };

  const temp = pk => () => {
    console.log('temp:', pk);
  };

  const onClick = async () => {
    console.log(token);
    try {
      const result = await Axios.delete(
        `https://study-watson.lhy.kr/api/v1/study/members/${memberId}/`,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      console.log(result);
      if (result.status === 204) {
        alert('탈퇴에 성공하셨습니다.');
        Router.pushRoute('/');
      } else {
        alert('탈퇴에 실패하셨습니다.');
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data.message));
      alert('탈퇴에 실패하셨습니다.');
    }
  };
  useEffect(() => {
    getSchedule();
  }, []);
  return (
    <div>
      <Header />
      <div
        onClick={() =>
          Router.pushRoute(`/addSchedule/${studyId}/member/${memberId}`)
        }
      >
        일정 생성
      </div>
      <div>
        {schedules.map(schedule => {
          return (
            <div
              key={schedule.pk}
              style={{ border: '1px solid', margin: '30px 0' }}
            >
              {console.log(schedule.pk)}
              <div>location</div>
              <div>{schedule.location}</div>
              <div>description</div>
              <div>{schedule.description}</div>
              <div>date</div>
              <div>{schedule.date}</div>
              <div>dueDate</div>
              <div>{schedule.dueDate}</div>
              <Link route="/modifySchedule" href="/modifySchedule">
                <a>[수정]</a>
              </Link>
              <Link
                route="/deleteSchedule"
                href="/deleteSchedule"
                onClick={temp(schedule.pk)}
              >
                <a>[삭제]</a>
              </Link>
            </div>
          );
        })}
      </div>
      <div onClick={onClick}>스터디 나가기</div>
    </div>
  );
};

studyDetail.getInitialProps = ({ ctx, token }) => {
  return {
    studyId: ctx.query.studyId || '0',
    memberId: ctx.query.memberId || '0',
    token,
  };
};

studyDetail.propTypes = {
  studyId: PropTypes.string.isRequired,
  memberId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default studyDetail;
