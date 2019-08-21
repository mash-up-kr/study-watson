import React, { useState } from 'react';
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
  padding-bottom: 3rem;
`;

const StyledRadio = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  padding: 1rem 0;
`;

const StyledRadioButton = styled.input`
  -webkit-appearance: radio;
  margin-right: 0.5rem;
`;

const StyledIconContainer = styled.div`
  width: 100%;
  border: 1px solid #ededed;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.5rem;
`;

const StyledIconBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledIcon = styled.label`
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIconCategory = styled.div`
  font-size: 0.7rem;
  color: #878D91;
  margin-bottom: 0.5rem;
`;

const StyledHideRadio = styled.input`
  width: 40px;
  height: 40px;
  margin: 0;
  -webkit-appearance: none;
  box-shadow: none;
  display: none;
  &:checked + label {
     border: 2px solid #4B2BFF;
  }
`;

const StyledRadioLabel = styled.label`
  position: relative;
  z-index: 10;
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const StyledIconImage = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
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
                <StyledRadioButton
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
                <StyledRadioButton
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
          <StyledIconContainer>
            <StyledIconCategory>Design</StyledIconCategory>
            <StyledIconBox>
              {icons.map(i => {
                return (
                  <div key={i.pk}>
                    <StyledIcon>
                      <StyledHideRadio
                        id={i.pk}
                        type="radio"
                        name="test"
                        value="small"
                        checked={icon.pk === i.pk}
                        onChange={() => setIcon(i)}
                      />
                      <StyledRadioLabel htmlFor={`${i.pk}`} />
                      <StyledIconImage src={i.image} alt="img" />
                    </StyledIcon>
                  </div>
                );
              })}
            </StyledIconBox>
            <StyledIconCategory>Basic Language</StyledIconCategory>
            <StyledIconBox>
              icons
            </StyledIconBox>
            <StyledIconCategory>Mobile Front-End</StyledIconCategory>
            <StyledIconBox>
              icons
            </StyledIconBox>
            <StyledIconCategory>Web Front-End</StyledIconCategory>
            <StyledIconBox>
              icons
            </StyledIconBox>
            <StyledIconCategory>Back-End</StyledIconCategory>
            <StyledIconBox>
              icons
            </StyledIconBox>
            <StyledIconCategory>Other Categories</StyledIconCategory>
            <StyledIconBox>
              icons
            </StyledIconBox>
          </StyledIconContainer>
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
