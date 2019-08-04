import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../containers/Header';
import { useInput } from '../common/useInput';
import Input from '../components/Input';
import {
  LOAD_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_REQUEST,
} from '../reducers/schedule';

const editSchedule = () => {
  const { schedule } = useSelector(state => state.schedule);

  // const [subject, setSubject] = useInput(schedule.subject);
  const [location, setLocation] = useInput(schedule.location);
  const [description, setDescription] = useInput(schedule.description);
  const [voteEndAt, setvoteEndAt] = useInput(schedule.voteEndAt.slice(0, 19));
  const [startAt, setStartAt] = useInput(schedule.startAt.slice(0, 19));
  const [studyingTime, setStudyTime] = useInput(
    schedule.studyingTime.slice(0, 5),
  );

  useEffect(() => {
    // const s = {
    //   target: {
    //     value: schedule.subject,
    //   },
    // };
    // setSubject(s);
    const l = {
      target: {
        value: schedule.location,
      },
    };
    setLocation(l);
    const d = {
      target: {
        value: schedule.description,
      },
    };
    setDescription(d);
    const v = {
      target: {
        value: schedule.voteEndAt.slice(0, 19),
      },
    };
    setvoteEndAt(v);
    const sa = {
      target: {
        value: schedule.startAt.slice(0, 19),
      },
    };
    setStartAt(sa);
    const st = {
      target: {
        value: schedule.studyingTime.slice(0, 5),
      },
    };
    setStudyTime(st);
  }, [schedule]);

  const dispatch = useDispatch();

  const onSumit = event => {
    event.preventDefault();
    const voteEndAtToISOString = new Date(voteEndAt).toISOString();
    const startAtToISOString = new Date(startAt).toISOString();

    dispatch({
      type: UPDATE_SCHEDULE_REQUEST,
      data: {
        id: schedule.pk,
        study: schedule.study,
        // subject,
        location,
        description,
        voteEndAt: voteEndAtToISOString,
        startAt: startAtToISOString,
        studyingTime: `${studyingTime}:00`,
      },
    });
  };

  return (
    <>
      <Header />
      <form onSubmit={onSumit}>
        {/* <Input
          label="주제"
          id="subject"
          type="text"
          value={subject}
          onChange={setSubject}
          onClickReset={() => setSubject('')}
        /> */}
        <Input
          label="장소"
          id="location"
          type="text"
          value={location}
          onChange={setLocation}
          onClickReset={() => setLocation('')}
        />
        <Input
          label="내용"
          id="description"
          type="text"
          value={description}
          onChange={setDescription}
          onClickReset={() => setDescription('')}
        />
        <Input
          label="투표 종류 일시"
          id="voteEndAt"
          type="datetime-local"
          value={voteEndAt}
          onChange={setvoteEndAt}
          onClickReset={() => setvoteEndAt('')}
        />
        <Input
          label="스터디 시작 일시"
          id="startAt"
          type="datetime-local"
          value={startAt}
          onChange={setStartAt}
          onClickReset={() => setStartAt('')}
        />
        <Input
          label="스터디 시간"
          id="studyingTime"
          type="time"
          value={studyingTime}
          onChange={setStudyTime}
          onClickReset={() => setStudyTime('')}
        />
        <input type="submit" value="저장" />
      </form>
    </>
  );
};

editSchedule.getInitialProps = ({ ctx, token }) => {
  const scheduleId = ctx.query.scheduleId || '0';
  return {
    scheduleId,
    token,
  };
};

editSchedule.getInitialProps = ({ ctx, token }) => {
  const { scheduleId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_SCHEDULE_REQUEST,
    data: {
      scheduleId,
      token,
    },
  });
};

export default editSchedule;
