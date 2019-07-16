import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { inflateRaw } from 'zlib';
import Header from '../containers/Header';
import { useInput } from '../common/useInput';
import Input from '../components/Input';
import { LOAD_SCHEDULE_REQUEST } from '../reducers/schedule';

const editSchedule = ({ scheduleId, token }) => {
  const cnt = useRef(1);
  const dispatch = useDispatch();
  const reduxState = useSelector(state => state);

  const [location, setLocation] = useInput('--');
  const [description, setDescription] = useInput('--');
  const [date, setDate] = useInput('--');
  const [dueDate, setDueDate] = useInput('--');

  const [information, setInformation] = useInput(reduxState.schedule);

  const onSumit = async event => {
    event.preventDefault();
    // dispactch, patch
  };

  useEffect(() => {
    console.log('>> UseEffect');
    console.log('>> information', information);
    dispatch({
      type: LOAD_SCHEDULE_REQUEST,
      data: {
        scheduleId,
        token,
      },
    });
  }, []);

  useEffect(() => {
    cnt.current += 1;
    console.log('>>cnt: ', cnt.current);
    console.log('>> props information의 값이 바뀌었습니다');
    console.log('>> information: ', information);
    // console.log(location);
    // setLocation('hello');
  }, [information]);

  return (
    <div>
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
        <input type="submit" value="[수정]" />
      </form>
      editSchedule
    </div>
  );
};

editSchedule.getInitialProps = ({ ctx, token }) => {
  const { scheduleId } = ctx.query;
  return { scheduleId, token };
};

editSchedule.propTypes = {
  scheduleId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default editSchedule;
