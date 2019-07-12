import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import Router from 'next/router';
import { useInput } from '../common/useInput';
import Header from '../containers/Header';
import Input from '../components/Input';

const addSchedule = ({ studyId, memberId, token }) => {
  const [location, setLocation] = useInput('');
  const [description, setDescription] = useInput('');
  const [date, setDate] = useInput('');
  const [dueDate, setDueDate] = useInput('');
  const onSumit = async event => {
    event.preventDefault();
    console.log(date, dueDate);
    const result = await Axios.post(
      'https://study-watson.lhy.kr/api/v1/study/schedules/',
      {
        study: memberId,
        location,
        description,
        date,
        dueDate,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      },
    );
    console.log(111, result);
    if (result.data.pk) {
      alert('정상적으로 생성 되었습니다.');
      Router.pushRoute(`/studyDetail/${studyId}/member/${memberId}`);
    } else {
      alert('일정 생성에 실패 하였습니다.');
    }
  };
  return (
    <>
      <Header />
      <form onSubmit={onSumit}>
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
          label="시간"
          id="date"
          type="text"
          value={date}
          onChange={setDate}
          onClickReset={() => setDate('')}
        />
        <Input
          label="투표 기간"
          id="dueDate"
          type="text"
          value={dueDate}
          onChange={setDueDate}
          onClickReset={() => setDueDate('')}
        />
        <input type="submit" value="생성" />
      </form>
    </>
  );
};

addSchedule.getInitialProps = ({ ctx, token }) => {
  return {
    studyId: ctx.query.studyId || '0',
    memberId: ctx.query.memberId || '0',
    token,
  };
};

addSchedule.propTypes = {
  studyId: PropTypes.string.isRequired,
  memberId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default addSchedule;
