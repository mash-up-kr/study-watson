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
  name,
  setName,
  description,
  setDescription,
}) => {
  return (
    <StyledScreen>
      <StyledTitle>스터디 만들기</StyledTitle>
      <StyledForm onSubmit={e => onSubmitForm(e, 1)}>
        <StyledLabel htmlFor="name">스터디 이름</StyledLabel>
        <StyledInput type="text" id="name" value={name} onChange={setName} />
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
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
};

export default MakeStudy;
