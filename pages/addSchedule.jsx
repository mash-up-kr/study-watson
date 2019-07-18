import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { ADD_SCHEDULE_REQUEST } from '../reducers/schedule';
import { useInput } from '../common/useInput';
import Header from '../containers/Header';
import Input from '../components/Input';

const addSchedule = ({ studyId }) => {
  const [location, setLocation] = useInput('');
  const [description, setDescription] = useInput('');
  const [date, setDate] = useInput('');
  const [dueDate, setDueDate] = useInput('');

  const dispatch = useDispatch();

  const onSumit = async event => {
    event.preventDefault();
    dispatch({
      type: ADD_SCHEDULE_REQUEST,
      data: {
        study: studyId,
        location,
        description,
        date,
        dueDate,
      },
    });
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
