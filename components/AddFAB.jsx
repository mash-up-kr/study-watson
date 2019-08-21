import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

const AddFAB = () => {
  const [icon, setIcon] = useState('');
  useEffect(() => {
    const path = window.location.pathname.replace(/[1-9]/g, "");
    switch (path) {
      case '/':
        setIcon('icon-add');
        break;
      case '/studyDetail/':
        setIcon('icon-calendar-white');
        break;
      default:
        setIcon('icon-add');
        break;
    }
  });

  return (
    <StyledFAB>
      {(icon === 'icon-add') && (
        <img src="/static/icon-add.svg" alt="add icon" />
      )}
      {(icon === 'icon-calendar-white') && (
        <img src="/static/icon-calendar-white.svg" alt="add icon" />
      )}
    </StyledFAB>
  );
};

export default AddFAB;