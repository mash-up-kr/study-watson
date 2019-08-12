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
  category,
  setCategory,
  description,
  setDescription,
  icon,
  icons,
  setIcon,
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
        <StyledLabel htmlFor="category">카테고리</StyledLabel>
        <select id="category" onChange={setCategory} value={category}>
          <option value="3">Develop</option>
          <option value="4">Design</option>
        </select>
        {icons.map(i => {
          return (
            <div key={i.pk}>
              <label>
                <input
                  type="radio"
                  name="test"
                  value="small"
                  checked={icon.pk === i.pk}
                  onChange={() => setIcon(i)}
                />
                <img src={i.image} alt="img" style={{ width: '50px' }} />
              </label>
            </div>
          );
        })}
        <StyledButton type="submit" value="다음" />
      </StyledForm>
    </StyledScreen>
  );
};

MakeStudy.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  setIcon: PropTypes.func.isRequired,
  icons: PropTypes.array.isRequired,
};

export default MakeStudy;
