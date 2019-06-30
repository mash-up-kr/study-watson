import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  StyledButton,
  StyledLabel,
  StyledInput,
  StyledTitle,
  StyledForm,
} from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
        <StyledInput
          type="text"
          value={description}
          onChange={setDescription}
        />
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

export default MakeStudy;
