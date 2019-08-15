import React from 'react';
import styled from 'styled-components';

import { Link } from '../routes';

const StyledFAB = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #4B2BFF;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 8px 0 rgba(0,0,0,0.15);
`;

const MakeStudyFAB = () => {
  return (
    <Link route="/addStudy" href="/addStudy">
      <StyledFAB>
        <img src="/static/icon-add.svg" alt="add icon" />
      </StyledFAB>
    </Link>
  );
};

export default MakeStudyFAB;