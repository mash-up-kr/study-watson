import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { StyledButton, StyledTitle } from '../common/StyledComponents';
import CategoryDesign from './CategoryDesign';
import CategoryDevelop from './CategoryDevelop';

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

const ShowStudy = ({ name, description, addStudy, category, icon }) => {
  return (
    <StyledScreen>
      <StyledTitle>작성하신 내용을 확인해주세요</StyledTitle>
      <StyledSubtitle>카테고리</StyledSubtitle>
      <StyledText>{category === '3' ? <CategoryDevelop /> : <CategoryDesign />}</StyledText>
      <StyledSubtitle>스터디 이름</StyledSubtitle>
      <StyledText>{name}</StyledText>
      <StyledSubtitle>스터디 설명</StyledSubtitle>
      <StyledText>{description}</StyledText>
      <StyledSubtitle>대표 아이콘</StyledSubtitle>
      <StyledText><img src={icon.image} alt="img" style={{ width: '40px' }} /></StyledText>
      <StyledButton
        type="button"
        name="next"
        value="만들기"
        onClick={addStudy}
      />
    </StyledScreen>
  );
};

ShowStudy.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  addStudy: PropTypes.func.isRequired,
};

export default ShowStudy;
