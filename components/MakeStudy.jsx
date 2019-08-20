import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  StyledButton,
  StyledLabel,
  StyledInput,
  StyledTitle,
  StyledForm,
  StyledInputContainer,
} from '../common/StyledComponents';
import CategoryDevelop from './CategoryDevelop';
import CategoryDesign from './CategoryDesign';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
`;

const StyledRadio = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;
  padding: 1rem 0;
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
      <StyledTitle>새로운 스터디</StyledTitle>
      <StyledForm onSubmit={e => onSubmitForm(e, 1)}>
        <StyledInputContainer>
          <StyledLabel htmlFor="category">카테고리</StyledLabel>
          <StyledRadio>
            <div>
              <label>
                <input
                  type="radio"
                  name="Develop"
                  id="develop"
                  value="3"
                  checked={category === '3'}
                  onChange={setCategory}
                />
                <CategoryDevelop />
              </label>
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <label>
                <input
                  type="radio"
                  name="Design"
                  id="design"
                  value="4"
                  checked={category === '4'}
                  onChange={setCategory}
                />
                <CategoryDesign />
              </label>
            </div>
          </StyledRadio>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="name">스터디 이름</StyledLabel>
          <StyledInput type="text" id="name" value={name} onChange={setName} />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="description">스터디 설명</StyledLabel>
          <StyledInput
            type="text"
            value={description}
            onChange={setDescription}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="icon">대표 아이콘</StyledLabel>
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
        </StyledInputContainer>
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
