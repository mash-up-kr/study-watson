import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Header from '../containers/Header';
import { useInput } from '../common/useInput';
import Input, { StyledInputContainer } from '../components/Input';
import {
  LOAD_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_REQUEST,
} from '../reducers/schedule';
import {
  StyledLabel,
  StyledInput,
  StyledTitle,
  StyledButton,
} from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  margin: auto;
`;

const StyledForm = styled.form`
  padding-bottom: 3rem;
`;

const editSchedule = () => {
  const { schedule } = useSelector(state => state.schedule);

  // const [subject, setSubject] = useInput(schedule.subject);
  const [location, setLocation] = useInput('');
  const [description, setDescription] = useInput('');
  const [voteEndAt, setvoteEndAt] = useInput('');
  const [startAt, setStartAt] = useInput('');
  const [studyingTime, setStudyTime] = useInput('');

  useEffect(() => {
    // const s = {
    //   target: {
    //     value: schedule.subject,
    //   },
    // };
    // setSubject(s);
    const l = {
      target: {
        value: schedule.location ? schedule.location : '',
      },
    };
    setLocation(l);
    const d = {
      target: {
        value: schedule.description ? schedule.description : '',
      },
    };
    setDescription(d);
    const v = {
      target: {
        value: schedule.voteEndAt ? schedule.voteEndAt.slice(0, 19) : '',
      },
    };
    setvoteEndAt(v);
    const sa = {
      target: {
        value: schedule.startAt ? schedule.startAt.slice(0, 19) : '',
      },
    };
    setStartAt(sa);
    const st = {
      target: {
        value: schedule.studyingTime ? schedule.studyingTime.slice(0, 5) : '',
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
      <StyledScreen>
        <StyledTitle>일정 수정</StyledTitle>
        <StyledForm onSubmit={onSumit}>
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
          <StyledInputContainer>
            <StyledLabel htmlFor="studyingTime">스터디 시간</StyledLabel>
            <StyledInput
              style={{ textIndent: '-16px' }}
              type="time"
              id="studyingTime"
              value={studyingTime}
              onChange={setStudyTime}
              min="00:00"
              max="12:00"
            />
          </StyledInputContainer>
          <StyledButton type="submit" value="수정" />
        </StyledForm>
      </StyledScreen>
    </>
  );
};

editSchedule.getInitialProps = ({ ctx, token }) => {
  const scheduleId = ctx.query.scheduleId || '0';
  ctx.store.dispatch({
    type: LOAD_SCHEDULE_REQUEST,
    data: {
      scheduleId,
      token,
    },
  });
  return {
    scheduleId,
    token,
  };
};

export default editSchedule;
