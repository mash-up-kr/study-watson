import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useInput } from '../common/useInput';
import Input, { StyledInputContainer } from '../components/Input';
import {
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

const EditForm = ({schedule}) => {
  const [location, setLocation] = useInput(schedule.location);
  const [subject, setSubject] = useInput(schedule.subject);
  const [description, setDescription] = useInput(schedule.description);
  const [voteEndAt, setvoteEndAt] = useInput(schedule.voteEndAt ? schedule.voteEndAt.slice(0, 19) : '');
  const [startAt, setStartAt] = useInput(schedule.startAt ? schedule.startAt.slice(0, 19) : '');
  const [studyingTime, setStudyTime] = useInput(schedule.studyingTime ? schedule.studyingTime.slice(0, 5) : '');

  const dispatch = useDispatch();

  const onSumit = useCallback(event => {
    event.preventDefault();
    const voteEndAtToISOString = new Date(voteEndAt).toISOString();
    const startAtToISOString = new Date(startAt).toISOString();
    dispatch({
      type: UPDATE_SCHEDULE_REQUEST,
      data: {
        id: schedule.pk,
        study: schedule.study,
        subject,
        location,
        description,
        voteEndAt: voteEndAtToISOString,
        startAt: startAtToISOString,
        studyingTime: `${studyingTime}:00`,
      },
    });
  }, [location, subject, description. voteEndAt, startAt. studyingTime]);

  return (
      <StyledScreen>
        <StyledTitle>일정 수정</StyledTitle>
        <StyledForm onSubmit={onSumit}>
          <Input
            label="제목"
            id="subject"
            type="text"
            value={subject}
            onChange={setSubject}
            onClickReset={() => setSubject('')}
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
            label="장소"
            id="location"
            type="text"
            value={location}
            onChange={setLocation}
            onClickReset={() => setLocation('')}
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
  );
};

EditForm.propTypes = {
  schedule: PropTypes.object.isRequired,
}

export default EditForm;