import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Axios from 'axios';

// import { ADD_SCHEDULE_REQUEST} from '../reducers/schedule'
import Header from '../containers/Header';
import { LOAD_SCHEDULES_REQUEST } from '../reducers/schedule';

const studyDetail = ({ studyId, memberId, token }) => {
  const { schedules } = useSelector(state => state.schedule);

  const deleteSchedule = pk => async () => {
    try {
      const result = await Axios.delete(
        `https://study-watson.lhy.kr/api/v1/study/schedules/${pk}/`,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      console.log(result);
      if (result.status === 204) {
        alert('삭제에 성공하셨습니다.');
        Router.pushRoute(`/studyDetail/${studyId}/member/${memberId}`);
      } else {
        alert('삭제에 실패하셨습니다.');
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data.message));
      alert('삭제에 실패하셨습니다.');
    }
  };

  const modifySchedule = pk => async () => {
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
        {schedules &&
          schedules.length > 0 &&
          schedules.map(schedule => {
            return (
              <div
                key={schedule.pk}
                style={{ border: '1px solid', margin: '30px 0' }}
              >
                <div>location</div>
                <div>{schedule.location}</div>
                <div>description</div>
                <div>{schedule.description}</div>
                <div>date</div>
                <div>{schedule.date}</div>
                <div>dueDate</div>
                <div>{schedule.dueDate}</div>
                <div onClick={modifySchedule(schedule.pk)}>[수정]</div>
                <div onClick={deleteSchedule(schedule.pk)}>[삭제]</div>
              </div>
            );
          })}
      </div>
      <div onClick={onClick}>스터디 나가기</div>
    </div>
  );
};

studyDetail.getInitialProps = ({ ctx, token }) => {
  const { studyId = 0, memberId = 0 } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_SCHEDULES_REQUEST,
    data: {
      studyId,
      token,
    },
  });
  return {
    studyId,
    memberId,
    token,
  };
};

studyDetail.propTypes = {
  studyId: PropTypes.string.isRequired,
  memberId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default studyDetail;
