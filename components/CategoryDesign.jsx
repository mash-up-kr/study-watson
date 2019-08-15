import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.span`
  font-size: 0.9rem;
  color: #FF6584;
  font-weight: bold;
`;

const StyledCircle = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  display: inline-block;
  border-radius: 50%;
  background-color: #FF6584;
  margin: 0 6px 2px 0;
`;

const CategoryDesign = () => {
  return (
    <StyledContainer>
      <StyledCircle />
      Design
    </StyledContainer>
  );
};

export default CategoryDesign;