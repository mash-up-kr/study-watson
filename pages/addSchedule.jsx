import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { ADD_SCHEDULE_REQUEST } from '../reducers/schedule';
import { useInput } from '../common/useInput';
import Header from '../containers/Header';
import Input from '../components/Input';

const addSchedule = ({ studyId }) => {
  const [subject, setSubject] = useInput('');
  const [location, setLocation] = useInput('');
  const [description, setDescription] = useInput('');
  const [voteEndAt, setvoteEndAt] = useInput('');
  const [startAt, setStartAt] = useInput('');
  const [studyingTime, setStudyTime] = useInput('');

  const dispatch = useDispatch();

  const onSumit = async event => {
    event.preventDefault();
    const voteEndAtToISOString = new Date(voteEndAt).toISOString();
    const startAtToISOString = new Date(startAt).toISOString();
    dispatch({
      type: ADD_SCHEDULE_REQUEST,
      data: {
        study: studyId,
        subject,
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
        <Input
          label="주제"
          id="subject"
          type="text"
          value={subject}
          onChange={setSubject}
          onClickReset={() => setSubject('')}
        />
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
        <input type="submit" value="생성" />
      </form>
    </>
  );
};

addSchedule.getInitialProps = ({ ctx, token }) => {
  const studyId = ctx.query.studyId || '0';
  return {
    studyId,
    token,
  };
};

addSchedule.propTypes = {
  studyId: PropTypes.string.isRequired,
};

export default addSchedule;
