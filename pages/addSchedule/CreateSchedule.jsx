import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ADD_SCHEDULE_REQUEST } from '../../reducers/schedule';
import { useInput } from '../../common/useInput';
import Input, { StyledInputContainer } from '../../components/Input';
import {
  StyledLabel,
  StyledInput,
  StyledTitle,
  StyledButton,
} from '../../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  margin: auto;
`;

const StyledForm = styled.form`
  padding-bottom: 3rem;
`;

const addSchedule = ({ studyId }) => {
  const utcDate = new Date().getTime() + 10 * 60 * 60 * 1000;
  const date = `${new Date(utcDate).toISOString().slice(0, 14)}00`;
  const [subject, setSubject] = useInput('');
  const [location, setLocation] = useInput('');
  const [description, setDescription] = useInput('');
  const [voteEndAt, setvoteEndAt] = useInput(date);
  const [startAt, setStartAt] = useInput(date);
  const [studyingTime, setStudyTime] = useInput('01:00');

  const dispatch = useDispatch();

  const onSubmit = async event => {
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
      <StyledScreen>
        <StyledTitle>새로운 일정</StyledTitle>
        <StyledForm onSubmit={onSubmit}>
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
            label="투표 종료 일시"
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
          <StyledButton type="submit" value="만들기" />
        </StyledForm>
      </StyledScreen>
    </>
  );
};

addSchedule.propTypes = {
  studyId: PropTypes.string.isRequired,
};

export default addSchedule;
