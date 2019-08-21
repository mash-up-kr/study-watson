import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.span`
  font-size: 0.9rem;
  color: #4B2BFF;
  font-weight: 700;
`;

const StyledCircle = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  display: inline-block;
  border-radius: 50%;
  background-color: #4B2BFF;
  margin: 0 6px 1px 0;
`;

const CategoryDevelop = () => {
  return (
    <StyledContainer>
      <StyledCircle />
      Develop
    </StyledContainer>
  );
};

export default CategoryDevelop;