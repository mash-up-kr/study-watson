import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useInput } from '../../common/useInput';
import { UPDATE_STUDY_REQUEST } from '../../reducers/study';
import {
  StyledInputContainer,
  StyledButton,
  StyledLabel,
  StyledInput,
  StyledTitle,
  StyledForm,
} from '../../common/StyledComponents';
import CategoryDevelop from '../../components/CategoryDevelop';
import CategoryDesign from '../../components/CategoryDesign';
import StudyIcon from '../../components/StudyIcon';

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

const StyledIconCategory = styled.div`
  font-size: 0.7rem;
  color: #878d91;
  margin-bottom: 0.5rem;
`;

const EditStudy = ({ study, icons }) => {
  const [name, setName] = useInput(study.name);
  const [category, setCategory] = useInput((!!study.category && !!study.category.pk) ? JSON.stringify(study.category.pk) : '3');
  const [description, setDescription] = useInput(study.description);
  const [icon, setIcon] = useState(study.icon);
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(event => {
    event.preventDefault();

    dispatch({
      type: UPDATE_STUDY_REQUEST,
      data: {
        id: study.pk,
        category,
        name,
        description,
        icon: icon.pk,
      },
    });
  }, [category, name, description. icon]);

  return (
    <StyledScreen>
      <StyledTitle>스터디 수정하기</StyledTitle>
      <StyledForm onSubmit={onSubmitForm}>
        <StyledInputContainer>
          <StyledLabel htmlFor="category">카테고리</StyledLabel>
          <StyledRadio>
            <div>
              <label htmlFor="develop">
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
              <label htmlFor="design">
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
        {icons.length > 0 && !!icon && !!icon.pk && (
          <StyledInputContainer>
            <StyledLabel htmlFor="icon">대표 아이콘</StyledLabel>
            <StyledIconContainer>
              <StyledIconCategory>Design</StyledIconCategory>
              <StyledIconBox>
                <StudyIcon icon={icons[6]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[8]} pk={icon.pk} setIcon={setIcon} />

                <StudyIcon icon={icons[18]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[22]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[29]} pk={icon.pk} setIcon={setIcon} />
              </StyledIconBox>
              <StyledIconCategory>Basic Language</StyledIconCategory>
              <StyledIconBox>
                <StudyIcon icon={icons[2]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[3]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[10]} pk={icon.pk} setIcon={setIcon} />

                <StudyIcon icon={icons[12]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[13]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[14]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[17]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[19]} pk={icon.pk} setIcon={setIcon} />

                <StudyIcon icon={icons[24]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[25]} pk={icon.pk} setIcon={setIcon} />
              </StyledIconBox>
              <StyledIconCategory>Mobile Front-End</StyledIconCategory>
              <StyledIconBox>
                <StudyIcon icon={icons[0]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[7]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[11]} pk={icon.pk} setIcon={setIcon} />
              </StyledIconBox>
              <StyledIconCategory>Web Front-End</StyledIconCategory>
              <StyledIconBox>
                <StudyIcon icon={icons[1]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[20]} pk={icon.pk} setIcon={setIcon} />

                <StudyIcon icon={icons[28]} pk={icon.pk} setIcon={setIcon} />
              </StyledIconBox>
              <StyledIconCategory>Back-End</StyledIconCategory>
              <StyledIconBox>
                <StudyIcon icon={icons[4]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[15]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[16]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[23]} pk={icon.pk} setIcon={setIcon} />
              </StyledIconBox>
              <StyledIconCategory>Other Categories</StyledIconCategory>
              <StyledIconBox>
                <StudyIcon icon={icons[5]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[9]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[21]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[26]} pk={icon.pk} setIcon={setIcon} />
                <StudyIcon icon={icons[27]} pk={icon.pk} setIcon={setIcon} />
              </StyledIconBox>
            </StyledIconContainer>
          </StyledInputContainer>
        )}
        <StyledButton type="submit" value="저장" />
      </StyledForm>
    </StyledScreen>
  );
};

EditStudy.propTypes = {
  study: PropTypes.object.isRequired,
  icons: PropTypes.array.isRequired,
}

export default EditStudy;
