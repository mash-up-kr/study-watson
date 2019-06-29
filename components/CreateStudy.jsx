import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import uuidv4 from 'uuid/v4';

import StudyInvite from './StudyInvite';
import { useInput } from '../common/useInput';
import { ADD_STUDY } from '../reducers/study';
import { StyledButton, StyledLabel, StyledInput, StyledTitle, StyledForm } from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSubtitle = styled.div`
  width: 100%;
  font-size: 0.8rem;
  color: #595959;
`;

const StyledText = styled.div`
  width: 100%;
  padding: 1rem 0;
  font-size: 1rem;
  margin: 0.5rem 0 1.5rem 0;
`;

const ShowStudy = ({ title, description, setDepth }) => {
  return (
    <StyledScreen>
      <StyledTitle>
        작성하신 내용을
        <br />
        확인해주세요
      </StyledTitle>
      <StyledSubtitle>스터디 이름</StyledSubtitle>
      <StyledText>{title}</StyledText>
      <StyledSubtitle>설명</StyledSubtitle>
      <StyledText>{description}</StyledText>
      <StyledButton type="button" name="next" value="만들기" onClick={() => setDepth(2)} />
    </StyledScreen>
  );
};

ShowStudy.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setDepth: PropTypes.func.isRequired,
};

const MakeStudy = ({
  onSubmitForm,
  title,
  setTitle,
  description,
  setDescription,
}) => {
  return (
    <StyledScreen>
      <StyledTitle>스터디 만들기</StyledTitle>
      <StyledForm onSubmit={e => onSubmitForm(e, 1)}>
        <StyledLabel htmlFor="title">스터디 이름</StyledLabel>
        <StyledInput type="text" id="title" value={title} onChange={setTitle} />
        <StyledLabel htmlFor="description">스터디 설명</StyledLabel>
        <StyledInput type="text" value={description} onChange={setDescription} />
        <StyledButton type="submit" value="다음" />
      </StyledForm>
    </StyledScreen>
  );
};

MakeStudy.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
};

const CreateStudy = () => {
  const id = uuidv4();
  const [depth, setDepth] = useState(0);
  const [title, setTitle] = useInput('');
  const [description, setDescription] = useInput('');

  const dispatch = useDispatch();

  const addStudy = to => {
    dispatch({
      type: ADD_STUDY,
      payload: { id, title, description },
    });
    setDepth(to);
  };

  const onSubmitForm = (e, to) => {
    e.preventDefault();
    addStudy(to);
  };

  if (depth === 2) {
    return (
      <div>
        <StudyInvite link={id} />
      </div>
    );
  }
  if (depth === 1) {
    return (
      <div>
        <ShowStudy
          title={title}
          description={description}
          setDepth={setDepth}
        />
      </div>
    );
  }
  return (
    // MakeStudy - ShowStudy - StudyInvite
    <div>
      <MakeStudy
        onSubmitForm={onSubmitForm}
        title={title}
        setTitle={setTitle}
        setDescription={setDescription}
        description={description}
      />
    </div>
  );
};

export default CreateStudy;
